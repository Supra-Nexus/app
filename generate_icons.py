#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

def create_rounded_rectangle_mask(size, radius):
    """Create a mask for rounded rectangle"""
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    
    # Draw rounded rectangle
    draw.rounded_rectangle([(0, 0), (size-1, size-1)], radius, fill=255)
    
    return mask

def create_hanzo_icon(size):
    """Create Hanzo icon at specified size with black background and macOS style"""
    # Create black background with slight gradient
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Create background with gradient
    bg = Image.new('RGBA', (size, size), (0, 0, 0, 255))
    draw_bg = ImageDraw.Draw(bg)
    
    # Add subtle gradient overlay (darker at top, slightly lighter at bottom)
    for y in range(size):
        # Gradient from black to very dark gray
        gradient_value = int(10 * (y / size))  # Max value of 10 for very subtle gradient
        draw_bg.rectangle([(0, y), (size, y+1)], fill=(gradient_value, gradient_value, gradient_value, 255))
    
    draw = ImageDraw.Draw(bg)
    
    # Scale factor for the icon
    padding = size * 0.2  # 20% padding for macOS style
    icon_size = size - (2 * padding)
    icon_scale = icon_size / 67.0
    offset = padding
    
    # Define the Hanzo logo paths (scaled)
    def scale_point(x, y):
        return (x * icon_scale + offset, y * icon_scale + offset)
    
    # Draw the Hanzo logo paths with slight transparency for depth
    white = (255, 255, 255, 255)
    gray = (200, 200, 200, 255)  # Slightly darker gray for shadows
    
    # Bottom left square
    points = [scale_point(0, 44.6369), scale_point(22.21, 44.6369), 
              scale_point(22.21, 67), scale_point(0, 67)]
    draw.polygon(points, fill=white)
    
    # Bottom left shadow
    points = [scale_point(0, 44.6369), scale_point(22.21, 46.8285),
              scale_point(22.21, 44.6369), scale_point(0, 44.6369)]
    draw.polygon(points, fill=gray)
    
    # Center diagonal
    points = [scale_point(0.0878906, 44.6367), scale_point(22.2534, 22.3184),
              scale_point(66.7038, 22.3184), scale_point(44.4634, 44.6367)]
    draw.polygon(points, fill=white)
    
    # Top left square
    points = [scale_point(0, 0), scale_point(22.21, 0),
              scale_point(22.21, 22.3184), scale_point(0, 22.3184)]
    draw.polygon(points, fill=white)
    
    # Top right square
    points = [scale_point(44.5098, 0), scale_point(66.7198, 0),
              scale_point(66.7198, 22.3184), scale_point(44.5098, 22.3184)]
    draw.polygon(points, fill=white)
    
    # Top right shadow
    points = [scale_point(44.5098, 20.0822), scale_point(66.6753, 22.3185),
              scale_point(66.6753, 22.3185), scale_point(44.5098, 22.3185)]
    draw.polygon(points, fill=gray)
    
    # Bottom right square
    points = [scale_point(44.5098, 44.6369), scale_point(66.7198, 44.6369),
              scale_point(66.7198, 67), scale_point(44.5098, 67)]
    draw.polygon(points, fill=white)
    
    # Apply rounded corners for macOS style
    if size >= 128:  # Only round corners for larger icons
        radius = int(size * 0.18)  # macOS standard is about 18% radius
        mask = create_rounded_rectangle_mask(size, radius)
        
        # Create final image with transparency
        final = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        final.paste(bg, (0, 0))
        final.putalpha(mask)
        
        # Add subtle highlight overlay at top
        overlay = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw_overlay = ImageDraw.Draw(overlay)
        
        # Top highlight gradient
        for y in range(int(size * 0.3)):
            alpha = int(20 * (1 - y / (size * 0.3)))  # Fade from 20 to 0
            draw_overlay.rectangle([(0, y), (size, y+1)], 
                                  fill=(255, 255, 255, alpha))
        
        # Composite the highlight
        final = Image.alpha_composite(final, overlay)
        
        return final
    else:
        # For small icons, don't round corners
        return bg

# Icon sizes for macOS and Tauri
icon_sizes = {
    '32x32.png': 32,
    '128x128.png': 128,
    '128x128@2x.png': 256,
    'icon.png': 512,
    'app-icon.png': 512,
    'Square30x30Logo.png': 30,
    'Square44x44Logo.png': 44,
    'Square71x71Logo.png': 71,
    'Square89x89Logo.png': 89,
    'Square107x107Logo.png': 107,
    'Square142x142Logo.png': 142,
    'Square150x150Logo.png': 150,
    'Square284x284Logo.png': 284,
    'Square310x310Logo.png': 310,
    'StoreLogo.png': 50,
    'tray-icon-macos.png': 32,
}

output_dir = '/Users/z/work/hanzo/app/apps/hanzo-desktop/src-tauri/icons/'

# Generate all PNG icons
for filename, size in icon_sizes.items():
    icon = create_hanzo_icon(size)
    icon.save(os.path.join(output_dir, filename), 'PNG')
    print(f"Generated {filename} ({size}x{size})")

# Generate ICO file (Windows) - no rounded corners for Windows
def create_windows_icon(size):
    """Create icon without rounded corners for Windows"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    padding = size * 0.2
    icon_size = size - (2 * padding)
    icon_scale = icon_size / 67.0
    offset = padding
    
    def scale_point(x, y):
        return (x * icon_scale + offset, y * icon_scale + offset)
    
    white = (255, 255, 255, 255)
    gray = (200, 200, 200, 255)
    
    # Draw all the logo parts (same as above but without gradient/rounding)
    points = [scale_point(0, 44.6369), scale_point(22.21, 44.6369), 
              scale_point(22.21, 67), scale_point(0, 67)]
    draw.polygon(points, fill=white)
    
    points = [scale_point(0, 44.6369), scale_point(22.21, 46.8285),
              scale_point(22.21, 44.6369), scale_point(0, 44.6369)]
    draw.polygon(points, fill=gray)
    
    points = [scale_point(0.0878906, 44.6367), scale_point(22.2534, 22.3184),
              scale_point(66.7038, 22.3184), scale_point(44.4634, 44.6367)]
    draw.polygon(points, fill=white)
    
    points = [scale_point(0, 0), scale_point(22.21, 0),
              scale_point(22.21, 22.3184), scale_point(0, 22.3184)]
    draw.polygon(points, fill=white)
    
    points = [scale_point(44.5098, 0), scale_point(66.7198, 0),
              scale_point(66.7198, 22.3184), scale_point(44.5098, 22.3184)]
    draw.polygon(points, fill=white)
    
    points = [scale_point(44.5098, 20.0822), scale_point(66.6753, 22.3185),
              scale_point(66.6753, 22.3185), scale_point(44.5098, 22.3185)]
    draw.polygon(points, fill=gray)
    
    points = [scale_point(44.5098, 44.6369), scale_point(66.7198, 44.6369),
              scale_point(66.7198, 67), scale_point(44.5098, 67)]
    draw.polygon(points, fill=white)
    
    return img

icon_ico = create_windows_icon(256)
icon_ico.save(os.path.join(output_dir, 'icon.ico'), format='ICO', 
              sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print("Generated icon.ico")

# For macOS .icns, we need to use a different approach
# Generate the required sizes for iconutil
icns_sizes = [16, 32, 64, 128, 256, 512, 1024]
temp_iconset = '/tmp/hanzo.iconset'
os.makedirs(temp_iconset, exist_ok=True)

for size in icns_sizes:
    # Normal resolution
    icon = create_hanzo_icon(size)
    icon.save(f'{temp_iconset}/icon_{size}x{size}.png', 'PNG')
    
    # Retina resolution (except for 1024)
    if size < 1024:
        icon_2x = create_hanzo_icon(size * 2)
        icon_2x.save(f'{temp_iconset}/icon_{size}x{size}@2x.png', 'PNG')

print("Generated iconset files")

# Convert to .icns using iconutil (macOS only)
import subprocess
try:
    subprocess.run(['iconutil', '-c', 'icns', temp_iconset, '-o', 
                    os.path.join(output_dir, 'icon.icns')], check=True)
    print("Generated icon.icns")
except:
    print("Could not generate .icns file (iconutil not available or not on macOS)")

print("\nAll icons generated successfully!")