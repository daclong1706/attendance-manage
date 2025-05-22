from app import create_app
from app.extensions import db
from app.models.training_program import TrainingProgram

def runTrainingProgram():
    app = create_app()

    with app.app_context():
        subjects = [
            {"code": "COMP1010", "name": "Lập trình cơ bản", "credits": 3, "theory_hours": 60, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 1, "is_optional": False, "note": "Năm 1"},
            {"code": "COMP1800", "name": "Cơ sở toán trong Công nghệ thông tin", "credits": 4, "theory_hours": 75, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 1, "is_optional": False, "note": "Năm 1"},
            {"code": "COMP1801", "name": "Toán rời rạc và ứng dụng", "credits": 2, "theory_hours": 30, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 1, "is_optional": False, "note": "Năm 1"},
            {"code": "COMP1802", "name": "Thiết kế web", "credits": 2, "theory_hours": 30, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 1, "is_optional": False, "note": "Năm 1"},
            {"code": "MILI2701", "name": "Đường lối quốc phòng và an ninh của Đảng Cộng sản Việt Nam", "credits": 3, "theory_hours": 37, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "MILI", "semester": 1, "is_optional": False, "note": "Năm 1"},
            {"code": "POLI1903", "name": "Pháp luật đại cương", "credits": 2, "theory_hours": 20, "practice_hours": 20, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "POLI", "semester": 1, "is_optional": False, "note": "Năm 1"},
            {"code": "POLI2001", "name": "Triết học Mác – Lênin", "credits": 3, "theory_hours": 30, "practice_hours": 30, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "POLI", "semester": 1, "is_optional": False, "note": "Năm 1"},
            {"code": "PSYC1001", "name": "Tâm lý học đại cương", "credits": 2, "theory_hours": 20, "practice_hours": 20, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "PSYC", "semester": 1, "is_optional": False, "note": "Năm 1"},
            {"code": "PHYL2401", "name": "Giáo dục thể chất 1", "credits": 1, "theory_hours": 2, "practice_hours": 26, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "PHYL", "semester": 1, "is_optional": True, "note": "Năm 1"},
            {"code": "COMP1013", "name": "Lập trình nâng cao", "credits": 3, "theory_hours": 60, "practice_hours": 0, "prerequisite_code": "COMP1010", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 2, "is_optional": False, "note": "Năm 1"},
            {"code": "COMP1017", "name": "Lập trình hướng đối tượng", "credits": 3, "theory_hours": 60, "practice_hours": 0, "prerequisite_code": "COMP1010", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 2, "is_optional": False, "note": "Năm 1"},
            {"code": "MILI2702", "name": "Công tác quốc phòng và an ninh", "credits": 2, "theory_hours": 22, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "MILI", "semester": 2, "is_optional": False, "note": "Năm 1"},
            {"code": "POLI2002", "name": "Kinh tế chính trị học Mác - Lênin", "credits": 2, "theory_hours": 20, "practice_hours": 20, "prerequisite_code": "POLI2001", "previous_code": None, "equivalent_code": None, "department": "POLI", "semester": 2, "is_optional": False, "note": "Năm 1"},
            {"code": "POLI2003", "name": "Chủ nghĩa xã hội khoa học", "credits": 2, "theory_hours": 20, "practice_hours": 20, "prerequisite_code": "POLI2001", "previous_code": None, "equivalent_code": None, "department": "POLI", "semester": 2, "is_optional": False, "note": "Năm 1"},
            {"code": "PHYL2", "name": "Giáo dục Thể chất 2", "credits": 1, "theory_hours": 30, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "PHYL", "semester": 2, "is_optional": True, "note": "Năm 1"},
            {"code": "COMP1016", "name": "Cấu trúc dữ liệu", "credits": 3, "theory_hours": 60, "practice_hours": 0, "prerequisite_code": "COMP1010", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 3, "is_optional": False, "note": "Năm 2"},
            {"code": "COMP1018", "name": "Cơ sở dữ liệu", "credits": 3, "theory_hours": 60, "practice_hours": 0, "prerequisite_code": "COMP1010", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 3, "is_optional": False, "note": "Năm 2"},
            {"code": "MILI2703", "name": "Quân sự chung", "credits": 2, "theory_hours": 35, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "MILI", "semester": 3, "is_optional": False, "note": "Năm 2"},
            {"code": "COMP1019", "name": "Lập trình trên Windows", "credits": 3, "theory_hours": 30, "practice_hours": 0, "prerequisite_code": "COMP1017", "previous_code": None, "equivalent_code": "COMP1207", "department": "COMP", "semester": 3, "is_optional": False, "note": "Năm 2"},
            {"code": "COMP1501", "name": "Xác suất thống kê và ứng dụng", "credits": 3, "theory_hours": 45, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 3, "is_optional": False, "note": "Năm 2"},
            {"code": "COMP1011", "name": "Kiến trúc máy tính và hợp ngữ", "credits": 3, "theory_hours": 45, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 4, "is_optional": False, "note": "Năm 2"},
            {"code": "COMP1332", "name": "Hệ điều hành", "credits": 3, "theory_hours": 60, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 4, "is_optional": False, "note": "Năm 2"},
            {"code": "COMP1401", "name": "Phân tích và thiết kế giải thuật", "credits": 3, "theory_hours": 45, "practice_hours": 0, "prerequisite_code": "COMP1010", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 4, "is_optional": False, "note": "Năm 2"},
            {"code": "COMP1044", "name": "Nhập môn công nghệ phần mềm", "credits": 3, "theory_hours": 54, "practice_hours": 0, "prerequisite_code": "COMP1017", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 5, "is_optional": False, "note": "Năm 3"},
            {"code": "COMP1060", "name": "Phân tích thiết kế hướng đối tượng", "credits": 3, "theory_hours": 36, "practice_hours": 0, "prerequisite_code": "COMP1017", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 5, "is_optional": False, "note": "Năm 3"},
            {"code": "COMP1024", "name": "Các hệ cơ sở dữ liệu", "credits": 3, "theory_hours": 54, "practice_hours": 0, "prerequisite_code": "COMP1018", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 5, "is_optional": True, "note": "Năm 3"},
            {"code": "COMP1074", "name": "Định tuyến mạng nâng cao (CISCO 2)", "credits": 3, "theory_hours": 45, "practice_hours": 0, "prerequisite_code": "COMP1015", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 6, "is_optional": True, "note": "Năm 3"},
            {"code": "COMP1410", "name": "Thực tập nghề nghiệp 1", "credits": 2, "theory_hours": 30, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 7, "is_optional": False, "note": "Năm 4"},
            {"code": "COMP1080", "name": "Công nghệ mạng không dây", "credits": 3, "theory_hours": 30, "practice_hours": 15, "prerequisite_code": "COMP1025", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 7, "is_optional": True, "note": "Năm 4"},
            {"code": "COMP1084", "name": "Thương mại điện tử", "credits": 3, "theory_hours": 54, "practice_hours": 0, "prerequisite_code": "COMP1018", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 7, "is_optional": True, "note": "Năm 4"},
            {"code": "COMP1309", "name": "Kiểm thử phần mềm nâng cao", "credits": 3, "theory_hours": 60, "practice_hours": 0, "prerequisite_code": "COMP1307", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 7, "is_optional": True, "note": "Năm 4"},
            {"code": "COMP1324", "name": "Phân tích dữ liệu lớn", "credits": 3, "theory_hours": 45, "practice_hours": 0, "prerequisite_code": "COMP1018", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 7, "is_optional": True, "note": "Năm 4"},
            {"code": "COMP1325", "name": "Máy học nâng cao", "credits": 3, "theory_hours": 45, "practice_hours": 0, "prerequisite_code": "COMP1717", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 7, "is_optional": True, "note": "Năm 4"},
            {"code": "COMP1504", "name": "Thị giác máy tính và ứng dụng", "credits": 3, "theory_hours": 45, "practice_hours": 0, "prerequisite_code": "COMP1050", "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 7, "is_optional": True, "note": "Năm 4"},
            {"code": "COMP1811", "name": "Thực tập nghề nghiệp 2", "credits": 5, "theory_hours": 75, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 8, "is_optional": False, "note": "Năm 4"},
            {"code": "COMP1083", "name": "Khóa luận tốt nghiệp", "credits": 6, "theory_hours": 90, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 8, "is_optional": True, "note": "Năm 4"},
            {"code": "COMP1813", "name": "Hồ sơ tốt nghiệp", "credits": 3, "theory_hours": 0, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 8, "is_optional": True, "note": "Năm 4"},
            {"code": "COMP1814", "name": "Sản phẩm nghiên cứu", "credits": 3, "theory_hours": 0, "practice_hours": 0, "prerequisite_code": None, "previous_code": None, "equivalent_code": None, "department": "COMP", "semester": 8, "is_optional": True, "note": "Năm 4"}
        ]

        for s in subjects:
            db.session.add(TrainingProgram(
                code=s["code"],
                name=s["name"],
                credits=s["credits"],
                theory_hours=s["theory_hours"],
                practice_hours=s["practice_hours"],
                prerequisite_code=s["prerequisite_code"],
                previous_code=s["previous_code"],
                equivalent_code=s["equivalent_code"],
                department=s["department"],
                semester=s["semester"],
                is_optional=s["is_optional"],
                note=s["note"]
            ))

        db.session.commit()
    print("Tạo bảng TrainingProgram thành công")
