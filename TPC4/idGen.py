import json
import uuid

def movie_id_generator(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    for movie in data['movies']:
        movie_id = str(uuid.uuid4())
        
        yield movie_id, movie

input_file_path = 'db/cinema.json'  # Input file
output_file_path = 'cinema.json'  # Output file

with open(output_file_path, 'w', encoding='utf-8') as output_file:
    movies_with_ids = []
    
    for movie_id, movie in movie_id_generator(input_file_path):
        print(f"ID: {movie_id}, Movie: {movie['title']}")
        
        movie['id'] = movie_id
        
        movies_with_ids.append(movie)
    
    json.dump({"movies": movies_with_ids}, output_file, indent=4, ensure_ascii=False)

print(f"Movies with IDs saved to {output_file_path}")