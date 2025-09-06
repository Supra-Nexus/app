#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

def create_rounded_rectangle_mask(size, radius):
    """Create a mask for rounded rectangle"""
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (size-1, size-1)], radius, fill=255)
    return mask

def create_hanzo_icon_ios(size):
    """Create Hanzo icon for iOS at specified size"""
    # Create black background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    # Scale factor for the icon
    padding = size * 0.15  # 15% padding for iOS
    icon_size = size - (2 * padding)
    icon_scale = icon_size / 67.0
    offset = padding
    
    # Define the Hanzo logo paths (scaled)
    def scale_point(x, y):
        return (x * icon_scale + offset, y * icon_scale + offset)
    
    # Draw the Hanzo logo paths
    white = (255, 255, 255, 255)
    gray = (200, 200, 200, 255)
    
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
    
    # Apply iOS rounded corners (less rounded than macOS)
    if size >= 58:  # Only round corners for larger icons
        radius = int(size * 0.1)  # iOS uses smaller radius
        mask = create_rounded_rectangle_mask(size, radius)
        final = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        final.paste(img, (0, 0))
        final.putalpha(mask)
        return final
    
    return img

# iOS icon sizes required
ios_sizes = {
    # iPhone Notification
    'AppIcon-20@2x.png': 40,
    'AppIcon-20@3x.png': 60,
    # iPhone Settings
    'AppIcon-29@2x.png': 58,
    'AppIcon-29@3x.png': 87,
    # iPhone Spotlight
    'AppIcon-40@2x.png': 80,
    'AppIcon-40@3x.png': 120,
    # iPhone App
    'AppIcon-60@2x.png': 120,
    'AppIcon-60@3x.png': 180,
    # iPad Notification
    'AppIcon-20.png': 20,
    'AppIcon-20@2x~ipad.png': 40,
    # iPad Settings
    'AppIcon-29.png': 29,
    'AppIcon-29@2x~ipad.png': 58,
    # iPad Spotlight
    'AppIcon-40.png': 40,
    'AppIcon-40@2x~ipad.png': 80,
    # iPad App
    'AppIcon-76.png': 76,
    'AppIcon-76@2x.png': 152,
    # iPad Pro App
    'AppIcon-83.5@2x.png': 167,
    # App Store
    'AppIcon-1024.png': 1024,
}

output_dir = '/Users/z/work/hanzo/app/apps/hanzo-desktop/src-tauri/gen/apple/Assets.xcassets/AppIcon.appiconset/'
os.makedirs(output_dir, exist_ok=True)

# Generate all iOS icons
for filename, size in ios_sizes.items():
    icon = create_hanzo_icon_ios(size)
    icon.save(os.path.join(output_dir, filename), 'PNG')
    print(f"Generated iOS icon: {filename} ({size}x{size})")

print("\n✅ All iOS icons generated successfully!")
print("🚀 Ready to build for iOS!")