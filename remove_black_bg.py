from PIL import Image
import os

img_path = "/Users/apple/Downloads/Economics presentation/public/assets/form utility.png"
img = Image.open(img_path).convert("RGBA")

# Get image dimensions
width, height = img.size
pixels = img.load()

# Very low threshold to only catch pure/near-pure background black
threshold = 15

# Instead of blindly replacing all black pixels, let's do a flood fill from the corners
# This ensures we only remove the background black, not the black text inside the image

def flood_fill_transparent(x, y):
    target = pixels[x, y]
    if (target[0] > threshold or target[1] > threshold or target[2] > threshold or target[3] == 0):
        return
        
    stack = [(x, y)]
    visited = set()
    
    while stack:
        cx, cy = stack.pop()
        if (cx, cy) in visited:
            continue
            
        visited.add((cx, cy))
        p = pixels[cx, cy]
        
        # If it's a black-ish pixel
        if p[0] <= threshold and p[1] <= threshold and p[2] <= threshold and p[3] > 0:
            pixels[cx, cy] = (0, 0, 0, 0) # Make transparent
            
            # Add neighbors
            if cx > 0: stack.append((cx - 1, cy))
            if cx < width - 1: stack.append((cx + 1, cy))
            if cy > 0: stack.append((cx, cy - 1))
            if cy < height - 1: stack.append((cx, cy + 1))

# Start flood fill from the 4 corners (assuming the background touches corners)
flood_fill_transparent(0, 0)
flood_fill_transparent(width - 1, 0)
flood_fill_transparent(0, height - 1)
flood_fill_transparent(width - 1, height - 1)

# Also check top, bottom, left, right edges just in case corners aren't enough
for x in range(0, width, 10):
    flood_fill_transparent(x, 0)
    flood_fill_transparent(x, height - 1)
for y in range(0, height, 10):
    flood_fill_transparent(0, y)
    flood_fill_transparent(width - 1, y)

img.save(img_path, "PNG")
print("Successfully removed background black using flood fill.")
