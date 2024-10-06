/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import Banner from "@assets/images/BannerHome.jpg";
import { Loader } from "@mantine/core";
import { IconLocation, IconPhone, IconRecordMail } from "@tabler/icons-react";

function Contact() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      //   const result = await api.post("/api/contact", data);

      toast.success(
        "Gửi lời nhắn thành công, quản trị viên sẽ sớm liên hệ với bạn",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (error) {
      toast.error("Xảy ra lỗi trong quá trình xử lý", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative w-full ">
        <img
          src={Banner.src}
          alt="About page"
          className="w-full h-[400px] object-cover"
        />
        <span className="absolute top-36 left-[300px] p-2 text-white text-5xl font-bold leading-6 drop-shadow-md">
          Liên Hệ
        </span>
      </div>
      <div className="flex container px-24  mx-auto mt-20 sm:w-[1400px] w-auto">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-28 mx-auto w-[400px] lg:w-[600px] border-spacing-1"
          >
            <h2 className="text-primaryColor text-center text-2xl font-extrabold mb-12">
              Liên Hệ Với Chúng Tôi
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Họ và tên
              </label>
              <input
                className="rounded-lg appearance-none border border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nhập họ và tên của bạn"
                {...register("name")}
              />{" "}
              {errors?.name?.message ? (
                <span className="text-sm text-red-300">
                  {errors.name.message as string}
                </span>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
              <input
                className="rounded-lg appearance-none border border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                placeholder="Nhập số điện thoại của bạn"
                {...register("phone")}
              />
              {errors?.phone?.message ? (
                <span className="text-sm text-red-300">
                  {errors.phone.message as string}
                </span>
              ) : null}
            </div>
            <div className="">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="rounded-lg appearance-none border border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                type="email"
                placeholder="Nhập email của bạn"
                {...register("email")}
              />
              {errors?.email?.message ? (
                <span className="text-sm text-red-300">
                  {errors.email.message as string}
                </span>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="message"
              >
                Lời Nhắn
              </label>
              <textarea
                className="rounded-lg appearance-none border border-gray-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nội dung lời nhắn"
                {...register("message")}
              ></textarea>
              {errors?.message?.message ? (
                <span className="text-sm text-red-300">
                  {errors.message.message as string}
                </span>
              ) : null}
            </div>
            <div className=" flex items-center justify-center ">
              <button
                className="bg-primaryColor text-white  text-[20px] font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:opacity-90"
                type="submit"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader className="h-6 w-6 mr-4" />{" "}
                    <span>Đang tải....</span>
                  </div>
                ) : (
                  <span>Gửi Lời Nhắn</span>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="pl-20 mt-20">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-contact-information-background-template_23-2148191423.jpg?w=740&t=st=1698172115~exp=1698172715~hmac=b72333bb63f8444776602a4a18d1a555f763bd0f462dad53c96e7085e1fff488"
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 px-24 mx-20 mb-20 ">
        <div className=" flex mx-10 justify-center items-center ">
          <div>
            <IconPhone className="w-[40px] h-[40px] text-primaryColor" />
          </div>
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold text-black mb-1">
              Số Điện Thoại
            </h2>
            <span className="text-primaryColor font-medium">0345 666 999</span>
          </div>
        </div>
        <div className=" flex mx-10 justify-center items-center ">
          <div>
            <IconLocation className="w-[40px] h-[40px] text-primaryColor" />
          </div>
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold text-black mb-1">Địa Chỉ</h2>
            <span className="text-primaryColor font-medium">
              Hải Châu, Đà Nẵng
            </span>
          </div>
        </div>
        <div className=" flex mx-10 justify-center items-center ">
          <div>
            <IconRecordMail className="w-[40px] h-[40px] text-primaryColor" />
          </div>
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold text-black mb-1">Email</h2>
            <span className="text-primaryColor font-medium">
              example@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
