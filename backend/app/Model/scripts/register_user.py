import os
import numpy as np
# from capture_camera import capture_face
from deepface import DeepFace
from app.Model.scripts.calculate_threshold import load_embeddings, generate_pairs, calculate_optimal_threshold


# def register_user(user_id, save_dir='data/users/captured_faces/register', num_images=5):
#     """
#     Đăng ký người dùng và lưu embeddings khuôn mặt của họ.

#     Parameters:
#     - user_id (str): Tên hoặc ID của người dùng.
#     - save_dir (str): Thư mục lưu trữ ảnh đã chụp.
#     - num_images (int): Số lượng ảnh cần chụp.
#     """
#     user_folder = os.path.join('data/users', user_id)
#     os.makedirs(user_folder, exist_ok=True)

#     temp_save_dir = os.path.join('data', 'captured_faces', 'register')
#     os.makedirs(temp_save_dir, exist_ok=True)

#     capture_face(save_dir=temp_save_dir, num_images=num_images)

#     for file in os.listdir(temp_save_dir):
#         if file.endswith('.jpg') or file.endswith('.png'):
#             img_path = os.path.join(temp_save_dir, file)

#             # Trích xuất embedding sử dụng DeepFace
#             try:
#                 embedding = DeepFace.represent(
#                     img_path=img_path, model_name='Facenet512', enforce_detection=False)[0]['embedding']
#                 embedding = np.array(embedding)
#                 embedding = embedding.flatten()
#                 print(
#                     f"Embedding từ file {file} có kích thước: {embedding.shape}")

#                 # Lưu embedding vào thư mục người dùng
#                 embedding_file = os.path.join(
#                     user_folder, f"{file.split('.')[0]}.npy")
#                 np.save(embedding_file, embedding)
#                 print(f"Đã lưu embedding vào: {embedding_file}")

#             except Exception as e:
#                 print(f"Lỗi khi trích xuất embedding từ ảnh {file}: {e}")

#     # Xóa ảnh tạm sau khi đã trích xuất embedding
#     for file in os.listdir(temp_save_dir):
#         if file.endswith('.jpg') or file.endswith('.png'):
#             os.remove(os.path.join(temp_save_dir, file))

#     print(f"Đã đăng ký người dùng {user_id} với {num_images} ảnh.")

#     # Tải embeddings của tất cả người dùng
#     persons = load_embeddings(users_dir='data/users')
#     # Tạo các cặp cho tính toán ngưỡng
#     pairs = generate_pairs(persons, num_negative_per_person=10)
#     optimal_threshold = calculate_optimal_threshold(
#         pairs)  # Tính toán ngưỡng tối ưu
#     print(f"Ngưỡng tối ưu đã được cập nhật: {optimal_threshold}")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# USERS_DIR = os.path.join(BASE_DIR, "data", "users")

    
def register_student(user_id, images, save_dir=BASE_DIR+"/users/captured_faces/register"):
    """
    Đăng ký người dùng và lưu embeddings khuôn mặt của họ.

    Parameters:
    - user_id (str): Tên hoặc ID của người dùng.
    - images (list): Danh sách ảnh (dạng file) nhận từ frontend.
    - save_dir (str): Thư mục lưu trữ ảnh đã chụp.
    """
    user_folder = os.path.join(BASE_DIR+"/data/users", user_id)
    os.makedirs(user_folder, exist_ok=True)

    temp_save_dir = save_dir
    os.makedirs(temp_save_dir, exist_ok=True)

    embeddings = []

    # Lưu ảnh từ frontend và trích xuất embeddings
    for idx, image in enumerate(images):
        img_path = os.path.join(temp_save_dir, f"img{idx + 1}.png")
        image.save(img_path)

        # Trích xuất embedding
        try:
            embedding = DeepFace.represent(
                img_path=img_path, model_name="Facenet512", enforce_detection=False
            )[0]["embedding"]
            embedding = np.array(embedding).flatten()
            embeddings.append(embedding)

            # Lưu embedding vào thư mục người dùng
            np.save(os.path.join(user_folder, f"img{idx + 1}.npy"), embedding)
            print(f"Đã lưu embedding vào: {img_path}")

        except Exception as e:
            print(f"Lỗi khi trích xuất embedding từ ảnh {img_path}: {e}")

    print(f"Đã đăng ký người dùng {user_id} với {len(images)} ảnh.")

    # Tính toán ngưỡng nhận diện
    persons = load_embeddings(users_dir=BASE_DIR+"/data/users")
    pairs = generate_pairs(persons, num_negative_per_person=10)
    optimal_threshold = calculate_optimal_threshold(pairs)

    print(f"Ngưỡng tối ưu đã được cập nhật: {optimal_threshold}")


# if __name__ == "__main__":
#     user_id = input("Nhập User: ")
#     register_user(user_id, num_images=5)
