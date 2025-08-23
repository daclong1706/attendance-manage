import {
  Button,
  Card,
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import {
  FaQrcode,
  FaUserGraduate,
  FaUsers,
  FaChalkboardTeacher,
  FaUserShield,
  FaCamera,
  FaFingerprint,
  FaBell,
} from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlineNumbers } from "react-icons/md";

const HomePage = () => {
  const features = [
    {
      icon: <FaCamera size={32} className="text-cyan-500" />,
      title: "Điểm danh bằng FaceID",
      description:
        "Công nghệ nhận diện khuôn mặt AI cho phép điểm danh nhanh chóng, chính xác và không cần tiếp xúc.",
    },
    {
      icon: <FaQrcode size={32} className="text-cyan-500" />,
      title: "Điểm danh bằng mã QR",
      description:
        "Giảng viên tạo mã QR động cho mỗi buổi học, sinh viên chỉ cần quét để xác nhận có mặt.",
    },
    {
      icon: <MdOutlineNumbers size={32} className="text-cyan-500" />,
      title: "Điểm danh bằng mã Code",
      description:
        "Giảng viên cung cấp một mã code ngẫu nhiên, sinh viên nhập mã để hoàn tất điểm danh.",
    },
    {
      icon: <FaFingerprint size={32} className="text-cyan-500" />,
      title: "Điểm danh truyền thống",
      description:
        "Giảng viên có thể điểm danh thủ công trực tiếp trên hệ thống một cách dễ dàng và linh hoạt.",
    },
    {
      icon: <FaUsers size={32} className="text-cyan-500" />,
      title: "Quản lý Sinh viên & Giảng viên",
      description:
        "Quản lý thông tin chi tiết, phân quyền và theo dõi hoạt động của tất cả người dùng trong hệ thống.",
    },
    {
      icon: <FaChalkboardTeacher size={32} className="text-cyan-500" />,
      title: "Quản lý Lớp học & Môn học",
      description:
        "Tạo, chỉnh sửa, và sắp xếp lịch học cho các lớp, gán giảng viên và sinh viên một cách khoa học.",
    },
    {
      icon: <BsGraphUp size={32} className="text-cyan-500" />,
      title: "Báo cáo & Thống kê",
      description:
        "Xuất báo cáo chuyên cần theo lớp, sinh viên hoặc theo thời gian thực. Trực quan hóa dữ liệu bằng biểu đồ.",
    },
    {
      icon: <FaBell size={32} className="text-cyan-500" />,
      title: "Thông báo tự động",
      description:
        "Gửi thông báo qua email hoặc trên ứng dụng về lịch học, trạng thái điểm danh và các sự kiện quan trọng.",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar fluid rounded className="fixed top-0 z-50 w-full shadow-sm">
        <NavbarBrand href="/">
          <img
            className="mr-2 h-8 w-8"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_EzNuatW5VzfxeAhX1gac9P1JfojM1t_tIg&s"
            alt="Att Face"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Att Face
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Link to="/login">
            <Button>Đăng nhập</Button>
          </Link>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="#home">Trang chủ</NavbarLink>
          <NavbarLink href="#features">Tính năng</NavbarLink>
          <NavbarLink href="#roles">Vai trò</NavbarLink>
          <NavbarLink href="#about">Về chúng tôi</NavbarLink>
        </NavbarCollapse>
      </Navbar>

      <main className="pt-10">
        {/* Hero Section */}
        <section
          id="home"
          className="flex h-[calc(100vh-80px)] w-full items-center bg-white"
        >
          <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="mb-4 max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl">
                Hệ Thống Điểm Danh Thông Minh & Hiện Đại
              </h1>
              <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl">
                Tự động hóa quy trình điểm danh, tiết kiệm thời gian cho giảng
                viên và nâng cao trải nghiệm học tập cho sinh viên.
              </p>
              <Button href="#features" size="lg">
                Khám phá tính năng
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
            <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
              <img
                src="https://wesmart.vn/upload/z3315131751550_088b97c33bb353473ce6645c20cce6c1.jpg?w=800"
                alt="mockup"
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 lg:py-24">
          <div className="mx-auto max-w-screen-xl px-4">
            <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
                Tính năng nổi bật
              </h2>
              <p className="font-light text-gray-500 sm:text-xl">
                Hệ thống cung cấp đầy đủ các công cụ cần thiết để quản lý và
                theo dõi chuyên cần một cách hiệu quả nhất.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="transform transition hover:scale-105"
                >
                  <div className="flex flex-col items-center p-4 text-center">
                    {feature.icon}
                    <h5 className="mt-4 text-xl font-bold tracking-tight">
                      {feature.title}
                    </h5>
                    <p className="mt-2 font-normal text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section id="roles" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-screen-xl px-4">
            <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
                Phân quyền theo vai trò
              </h2>
              <p className="font-light text-gray-500 sm:text-xl">
                Mỗi vai trò đều có giao diện và chức năng được tùy chỉnh để phục
                vụ tốt nhất cho nhu cầu của họ.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Admin Card */}
              <Card className="flex flex-col">
                <div className="flex items-center justify-center">
                  <FaUserShield className="h-12 w-12 text-red-500" />
                  <h5 className="ml-4 text-2xl font-bold">Quản trị viên</h5>
                </div>
                <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
                  <li>Toàn quyền quản lý hệ thống.</li>
                  <li>Tạo và quản lý tài khoản giảng viên, sinh viên.</li>
                  <li>Quản lý lớp học, môn học và niên khóa.</li>
                  <li>Xem báo cáo tổng hợp toàn trường.</li>
                  <li>Cấu hình hệ thống và cài đặt chung.</li>
                </ul>
              </Card>

              {/* Teacher Card */}
              <Card className="flex flex-col">
                <div className="flex items-center justify-center">
                  <FaChalkboardTeacher className="h-12 w-12 text-blue-500" />
                  <h5 className="ml-4 text-2xl font-bold">Giảng viên</h5>
                </div>
                <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
                  <li>Tạo và quản lý các buổi điểm danh.</li>
                  <li>Lựa chọn phương thức điểm danh (QR, FaceID...).</li>
                  <li>Xem lịch sử điểm danh của lớp mình phụ trách.</li>
                  <li>Chỉnh sửa và xác nhận kết quả điểm danh.</li>
                  <li>Xuất báo cáo chuyên cần của lớp.</li>
                </ul>
              </Card>

              {/* Student Card */}
              <Card className="flex flex-col">
                <div className="flex items-center justify-center">
                  <FaUserGraduate className="h-12 w-12 text-green-500" />
                  <h5 className="ml-4 text-2xl font-bold">Sinh viên</h5>
                </div>
                <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
                  <li>Thực hiện điểm danh theo yêu cầu.</li>
                  <li>Xem lịch học cá nhân.</li>
                  <li>Theo dõi lịch sử và tỷ lệ chuyên cần của bản thân.</li>
                  <li>Nhận thông báo từ giảng viên và hệ thống.</li>
                  <li>Gửi khiếu nại (nếu có) về kết quả điểm danh.</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 lg:py-24">
          <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8 px-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="mb-4 text-4xl font-extrabold">
                Về hệ thống của chúng tôi
              </h2>
              <p className="text-gray-600">
                Chúng tôi tin rằng công nghệ có thể giải quyết những vấn đề phức
                tạp trong giáo dục. Hệ thống Điểm Danh Trực Tuyến được xây dựng
                với mục tiêu đơn giản hóa quy trình, giảm thiểu sai sót và cung
                cấp dữ liệu minh bạch cho cả nhà trường, giảng viên và sinh
                viên. Sứ mệnh của chúng tôi là tạo ra một môi trường học tập
                hiện đại, hiệu quả và kết nối.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img
                className="w-full rounded-lg"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="office content 1"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer container className="rounded-none">
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <FooterBrand
              href="/"
              name="Att Face"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_EzNuatW5VzfxeAhX1gac9P1JfojM1t_tIg&s"
            />
            <FooterLinkGroup>
              <FooterLink href="#about">Về chúng tôi</FooterLink>
              <FooterLink href="#">Chính sách</FooterLink>
              <FooterLink href="#">Liên hệ</FooterLink>
            </FooterLinkGroup>
          </div>
          <FooterDivider />
          <FooterCopyright href="#" by="Attendance System™" year={2025} />
        </div>
      </Footer>
    </div>
  );
};

export default HomePage;
