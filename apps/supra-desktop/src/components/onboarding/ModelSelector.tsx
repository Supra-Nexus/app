import React, { useState } from 'react';
import { PREINSTALLED_MODELS, OllamaModel } from '../../lib/supra-node-manager/ollama-models';
import { ModelProvider } from '../ais/constants';

interface ModelSelectorProps {
  onModelSelect: (model: OllamaModel) => void;
  onSkip?: () => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ onModelSelect, onSkip }) => {
  const [selectedModel, setSelectedModel] = useState<OllamaModel | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleModelSelect = async (model: OllamaModel) => {
    setSelectedModel(model);
    setIsDownloading(true);
    
    // Trigger download and setup
    await onModelSelect(model);
    
    setIsDownloading(false);
  };

  const getProviderIcon = (provider?: string) => {
    switch (provider) {
      case ModelProvider['Supra-Backend']:
        return '🦁';
      case ModelProvider.Meta:
        return '📘';
      case ModelProvider.Mistral:
        return '🌬️';
      case ModelProvider.Qwen:
        return '🐼';
      case ModelProvider.DeepSeek:
        return '🌊';
      case ModelProvider.OpenAI:
        return '🤖';
      case ModelProvider.Google:
        return '🔍';
      case ModelProvider.Anthropic:
        return '🧭';
      default:
        return '🤖';
    }
  };

  const getSizeLabel = (size: number) => {
    if (size < 1) return `${(size * 1024).toFixed(0)} MB`;
    return `${size.toFixed(1)} GB`;
  };

  const getRequirementsLabel = (size: number) => {
    if (size < 1) return '✅ Runs on any device';
    if (size < 3) return '✅ 4GB+ RAM recommended';
    if (size < 10) return '⚡ 8GB+ GPU recommended';
    if (size < 20) return '💪 16GB+ GPU recommended';
    if (size < 40) return '🚀 24GB+ GPU recommended';
    return '🔥 32GB+ GPU required';
  };

  return (
    <div className="model-selector-container">
      <div className="onboarding-header">
        <h1>Welcome to Supra AI 🦁</h1>
        <h2>Your Private, Local AI Assistant</h2>
        <div className="privacy-banner">
          <div className="privacy-features">
            <span className="privacy-badge">🔒 100% Private</span>
            <span className="privacy-badge">🏠 Runs Locally</span>
            <span className="privacy-badge">☁️ No Cloud Required</span>
            <span className="privacy-badge">🆓 Completely Free</span>
          </div>
          <p className="privacy-description">
            All AI processing happens on your device. Your conversations, data, and ideas stay with you forever. 
            No tracking, no telemetry, no subscription fees.
          </p>
        </div>
      </div>

      <div className="model-selection">
        <h3>Choose Your AI Model</h3>
        <p className="selection-hint">
          Select a model based on your device's capabilities. You can change or add more models anytime.
        </p>

        <div className="model-cards">
          {PREINSTALLED_MODELS.map((model) => (
            <div
              key={model.fullName || `${model.model}:${model.tag}`}
              className={`model-card ${selectedModel?.name === model.name ? 'selected' : ''}`}
              onClick={() => !isDownloading && handleModelSelect(model)}
            >
              <div className="model-header">
                <span className="model-icon">{getProviderIcon(model.provider)}</span>
                <h4>{model.name}</h4>
                <span className="model-size">{getSizeLabel(model.size)}</span>
              </div>
              
              <p className="model-description">{model.description}</p>
              
              <div className="model-requirements">
                {getRequirementsLabel(model.size)}
              </div>

              <div className="model-capabilities">
                {model.capabilities.map((cap) => (
                  <span key={cap} className="capability-badge">
                    {cap === 'thinking' ? '🧠' : cap === 'tool-calling' ? '🛠️' : '💬'} 
                    {cap.replace('-', ' ')}
                  </span>
                ))}
              </div>

              {selectedModel?.name === model.name && isDownloading && (
                <div className="download-progress">
                  <div className="spinner"></div>
                  <span>Downloading {model.name}...</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="onboarding-actions">
          {onSkip && (
            <button className="skip-button" onClick={onSkip} disabled={isDownloading}>
              Skip for now
            </button>
          )}
          <div className="help-text">
            <p>💡 <strong>Tip:</strong> Start with Supra Nano-1 if you're unsure. It's incredibly fast and works on any device!</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .model-selector-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .onboarding-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .onboarding-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .onboarding-header h2 {
          font-size: 1.5rem;
          color: #666;
          font-weight: normal;
          margin-bottom: 2rem;
        }

        .privacy-banner {
          background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid #667eea30;
        }

        .privacy-features {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .privacy-badge {
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .privacy-description {
          color: #555;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .model-selection h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .selection-hint {
          text-align: center;
          color: #666;
          margin-bottom: 2rem;
        }

        .model-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .model-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          border: 2px solid #e5e5e5;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .model-card:hover {
          border-color: #667eea;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }

        .model-card.selected {
          border-color: #667eea;
          background: linear-gradient(135deg, #667eea05 0%, #764ba205 100%);
        }

        .model-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .model-icon {
          font-size: 1.5rem;
        }

        .model-header h4 {
          flex: 1;
          margin: 0;
          font-size: 1.2rem;
        }

        .model-size {
          background: #f0f0f0;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .model-description {
          color: #555;
          line-height: 1.5;
          margin-bottom: 1rem;
          min-height: 3rem;
        }

        .model-requirements {
          padding: 0.5rem;
          background: #f8f8f8;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .model-capabilities {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .capability-badge {
          background: #e5e5e5;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.85rem;
          text-transform: capitalize;
        }

        .download-progress {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .onboarding-actions {
          text-align: center;
        }

        .skip-button {
          background: transparent;
          color: #666;
          border: 1px solid #ddd;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .skip-button:hover:not(:disabled) {
          background: #f5f5f5;
        }

        .skip-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .help-text {
          margin-top: 1rem;
          color: #666;
        }

        .help-text strong {
          color: #333;
        }
      `}</style>
    </div>
  );
};