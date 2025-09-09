// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;

use crate::commands::fetch::{get_request, post_request};
use crate::commands::galxe::galxe_generate_proof;
use crate::commands::hardware::hardware_get_summary;
use crate::commands::zoo_node_manager_commands::{
    zoo_node_get_default_model, zoo_node_get_ollama_api_url,
    zoo_node_get_ollama_version, zoo_node_get_options, zoo_node_is_running,
    zoo_node_kill, zoo_node_remove_storage, zoo_node_set_default_options,
    zoo_node_set_options, zoo_node_spawn, show_zoo_node_manager_window,
    zoo_node_open_storage_location, zoo_node_open_storage_location_with_path,
    zoo_node_open_chat_folder,
};
use crate::commands::mcp_clients_install::{
    check_claude_installed,
    get_claude_config_help,
    is_server_registered_in_claude,
    register_server_in_claude,
    check_cursor_installed,
    get_cursor_command_config_help,
    get_cursor_sse_config_help,
    is_server_registered_in_cursor,
    register_command_server_in_cursor,
    register_sse_server_in_cursor,
};
use crate::commands::logs::{download_logs, retrieve_logs};
use crate::commands::spotlight_commands::{hide_spotlight_window_app, show_spotlight_window_app, open_main_window_with_path_app};
use crate::commands::debug_commands::{write_debug_log, save_debug_logs, get_debug_logs_path, open_debug_logs_folder};
use crate::commands::store_mock::{get_store_mock_response, store_api_proxy};
use deep_links::setup_deep_links;
use global_shortcuts::global_shortcut_handler;
use globals::ZOO_NODE_MANAGER_INSTANCE;
use local_zoo_node::zoo_node_manager::ZooNodeManager;
use tauri::{Emitter, WindowEvent};
use tauri::{Manager, RunEvent};
use tokio::sync::{RwLock};
use tray::create_tray;
use windows::{recreate_window, Window};
mod commands;
mod deep_links;
mod galxe;
mod global_shortcuts;
mod globals;
mod hardware;
mod local_zoo_node;
mod models;
mod tray;
mod windows;

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

fn main() {
    let _ = fix_path_env::fix();
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            app.emit("single-instance", Payload { args: argv, cwd })
                .unwrap();
        }))
        .plugin(
            tauri_plugin_log::Builder::new()
                .format(|out, message, record| {
                    // Ending with a triple ideographic space as separator so then we can group texts that belongs to the same log
                    out.finish(format_args!(
                        "[{}][{}][{}] {}　　　",
                        chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                        record.level(),
                        record.target(),
                        message
                    ))
                })
                .build(),
        )
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_shortcuts([
                    "super+shift+i",
                    "control+shift+i",
                    "super+shift+j",
                    "control+shift+j",
                ])
                .unwrap()
                .with_handler(
                    |app: &tauri::AppHandle,
                     shortcut: &tauri_plugin_global_shortcut::Shortcut,
                     event: tauri_plugin_global_shortcut::ShortcutEvent| {
                        global_shortcut_handler(app, *shortcut, event)
                    },
                )
                .build(),
        )
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![
            hide_spotlight_window_app,
            show_spotlight_window_app,
            open_main_window_with_path_app,
            show_zoo_node_manager_window,
            zoo_node_is_running,
            zoo_node_get_options,
            zoo_node_set_options,
            zoo_node_spawn,
            zoo_node_kill,
            zoo_node_remove_storage,
            zoo_node_open_storage_location,
            zoo_node_open_storage_location_with_path,
            zoo_node_open_chat_folder,
            zoo_node_set_default_options,
            zoo_node_get_ollama_api_url,
            zoo_node_get_default_model,
            hardware_get_summary,
            galxe_generate_proof,
            get_request,
            post_request,
            zoo_node_get_ollama_version,
            retrieve_logs,
            download_logs,
            check_claude_installed,
            is_server_registered_in_claude,
            register_server_in_claude,
            get_claude_config_help,
            check_cursor_installed,
            is_server_registered_in_cursor,
            register_command_server_in_cursor,
            register_sse_server_in_cursor,
            get_cursor_command_config_help,
            get_cursor_sse_config_help,
            write_debug_log,
            save_debug_logs,
            get_debug_logs_path,
            open_debug_logs_folder,
            get_store_mock_response,
            store_api_proxy,
        ])
        .setup(|app| {
            log::info!("starting app version: {}", env!("CARGO_PKG_VERSION"));
            let app_resource_dir = app.path().resource_dir()?;
            let app_data_dir = app.path().app_data_dir()?;

            {
                let _ = ZOO_NODE_MANAGER_INSTANCE.set(Arc::new(RwLock::new(
                    ZooNodeManager::new(app.handle().clone(), app_resource_dir, app_data_dir),
                )));
            }

            create_tray(app.handle())?;
            setup_deep_links(app.handle())?;

            /*
                This is the initialization pipeline
                At some point we will need to add a UI because some tasks can be hard/slow to execute
            */
            tauri::async_runtime::spawn({
                let app_handle = app.handle().clone();
                async move {
                    // Kill any existing process related to zoo and/or using zoo ports
                    let mut zoo_node_manager_guard =
                        ZOO_NODE_MANAGER_INSTANCE.get().unwrap().write().await;
                    zoo_node_manager_guard.kill().await;
                    drop(zoo_node_manager_guard);

                    let _ = recreate_window(app_handle.clone(), Window::Coordinator, false);
                    let _ = recreate_window(app_handle.clone(), Window::Spotlight, false);
                    let _ = recreate_window(app_handle.clone(), Window::Main, true);
                }
            });

            tauri::async_runtime::spawn({
                let app_handle = app.handle().clone();
                async move {
                    let mut zoo_node_manager_guard =
                        ZOO_NODE_MANAGER_INSTANCE.get().unwrap().write().await;
                    let mut receiver = zoo_node_manager_guard.subscribe_to_events();
                    drop(zoo_node_manager_guard);
                    while let Ok(state_change) = receiver.recv().await {
                        app_handle
                            .emit("zoo-node-state-change", state_change)
                            .unwrap_or_else(|e| {
                                log::error!("failed to emit global event for state change: {}", e);
                            });
                    }
                }
            });
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(move |app_handle, event| match event {
            RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            RunEvent::Exit { .. } => {
                tauri::async_runtime::spawn(async {
                    log::debug!("killing ollama and zoo-node before exit");

                    // For some reason process::exit doesn't fire RunEvent::ExitRequested event in tauri
                    let mut zoo_node_manager_guard =
                        ZOO_NODE_MANAGER_INSTANCE.get().unwrap().write().await;
                    zoo_node_manager_guard.kill().await;
                    drop(zoo_node_manager_guard);
                    // Force exit the application
                    std::process::exit(0);
                });
            }
            #[cfg(target_os = "macos")]
            RunEvent::Reopen { .. } => {
                let main_window_label = "main";
                if let Some(window) = app_handle.get_webview_window(main_window_label) {
                    window.show().unwrap();
                    window.center().unwrap();
                    let _ = window.set_focus();
                } else {
                    let main_window_config = app_handle
                        .config()
                        .app
                        .windows
                        .iter()
                        .find(|w| w.label == main_window_label)
                        .unwrap()
                        .clone();
                    match tauri::WebviewWindowBuilder::from_config(app_handle, &main_window_config)
                    {
                        Ok(builder) => {
                            if let Err(e) = builder.build() {
                                log::error!("failed to build main window: {}", e);
                            }
                        }
                        Err(e) => {
                            log::error!("failed to create WebviewWindowBuilder from config: {}", e);
                        }
                    }
                }
            }
            RunEvent::Ready => {}
            RunEvent::Resumed => {}
            RunEvent::MainEventsCleared => {}
            RunEvent::WindowEvent {
                label,
                event: WindowEvent::Focused(focused),
                ..
            } => match label {
                label if label == Window::Spotlight.as_str() => {
                    if !focused {
                        if let Some(spotlight_window) =
                            app_handle.get_webview_window(Window::Spotlight.as_str())
                        {
                            if spotlight_window.is_visible().unwrap_or(false) {
                                let _ = spotlight_window.hide();
                            }
                        }
                    }
                }
                _ => {}
            },
            _ => {}
        });
}
