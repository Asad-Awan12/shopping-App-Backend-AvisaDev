import { User } from "../Models/user.models.js";
import fs from "fs";
import { Todo } from "../Models/todos.models.js";
import { subTodo } from "../Models/subTodos.model.js";
import sendEmail from "../utils/nodeMailer.js";

let otp_Data = [];

let genrateOtp = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
};
let passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
let emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const register = async (req, res) => {
  try {
    let { fullName, email, password, phoneNumber, otp } = req.body;
    console.log("otp ", typeof otp);

    if (
      [fullName, email, password, phoneNumber].some(
        (field) => field.trim === ""
      )
    ) {
      return res.status(501).json({ message: "All fields are required" });
    }
    let emailValid = emailRegex.test(email);
    if (!emailValid) {
      return res.status(400).json({ error: "Email is not valid" });
    }
    let passwordValid = passwordRegex.test(password);
    if (!passwordValid) {
      return res.status(400).json({ error: "password is not valid" });
    }

    const existeduser = await User.findOne({
      $or: [{ fullName }, { email }],
    });
    if (existeduser) {
      return res.status(400).json({ error: "user with email already exist " });
    }
    let otpData;
    otp_Data.map((i) => {
      if (i.email !== email) {
        return res.status(404).json({ message: "Please Enter valid Email" });
      }
      if (i.email === email) {
        otpData = i;
      }
    });

    // if we send data from json then its otp is a Number correct
    // if we sedd data from Form then convert otp into String
    let otp_data = otpData?.otp;
    console.log("otpData ", otpData?.otp);

    if (String(otp_data) !== otp) {
      return res.status(400).json({ error: "invalid otp" });
    }

    // otp expired
    otp_Data.map((i) => {
      if (email === i?.email) {
        if (Date.now() > i?.expiresAt) {
          otp_Data = otp_Data.filter((i) => i?.email !== email);
        }
      }
    });

    console.log(otp_Data, "otp_Data");

    // console.log(otp_Data, "data");
    let profilePic = req?.file?.path;
    // console.log("req.file.path ", req.file.path);
    const user = await User.create({
      fullName,
      email,
      password,
      phoneNumber,
      profilePic,
      otp,
    });

    // console.log(user);
    return res.status(200).json({
      message: "Register user Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "user not register successfully" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field.trim === "")) {
    return res.status(501).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.staus(404).json({ message: "User does not found!!" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(404).json({ message: "Please Enter Correct Password" });
  }
  return res.status(201).json({
    message: "user login successfully",
    user: {
      email,
    },
  });
};

const update = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const { fullName, password, phoneNumber } = req.body;
  try {
    if ([fullName, password, phoneNumber].some((field) => field.trim === "")) {
      return res.status(501).json({ message: "All fields are required" });
    }
    const findUser = await User.findOne({ _id: userId });
    let oldFilePath = findUser;
    console.log("oldFilePath ", oldFilePath.profilePic);

    if (oldFilePath?.profilePic) {
      await fs.unlinkSync(oldFilePath?.profilePic);
    }
    let newfilePath = req?.file?.path;

    let profilePic = newfilePath;
    findUser.fullName = fullName;
    findUser.password = password;
    findUser.phoneNumber = phoneNumber;
    findUser.profilePic = profilePic;
    findUser.save();
    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     fullName,
    //     email,
    //     password,
    //     phoneNumber,
    //   },
    //   { new: true, runValidators: true }
    // );

    // if (!updatedUser) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    return res
      .status(201)
      .json({ message: "user update successfully", findUser });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error in Updating User" });
  }
};

const delete_User = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });
  let FindTodos = await Todo.find({ auther: id });
  let FindSubTodos = await subTodo.find({ auther: id });

  await User.findByIdAndDelete({ _id: id });
  for (const key of FindTodos) {
    console.log("key ", key);
    await Todo.findByIdAndDelete({ _id: key?._id });
  }
  for (const key of FindSubTodos) {
    console.log("key ", key);
    await subTodo.findByIdAndDelete({ _id: key?._id });
  }

  return res.status(201).json({
    message: "user Deleted Successfully",
    user,
    FindTodos,
    FindSubTodos,
  });
};

const updateEmail = async (req, res) => {
  try {
    const { email, password, newEmail, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not found!!" });
    }
    console.log(user);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(404).json({ message: "Please Enter Correct Password" });
    }
    let email_otp;
    otp_Data.map((i) => (email_otp = i.otp));
    if (email_otp !== otp) {
      return res.status(401).json({ message: "Please Enter Valid Otp" });
    }
    if (!user) {
      return res.status(401).json({ message: "User does not found!!" });
    }
    user.email = newEmail;
    await user.save();

    return res.status(201).json({ message: "Update Email Successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error in updating email" });
  }
};

let limit_arr = [];
const otp_generator = (req, res) => {
  const { email } = req.body;
  const otp = genrateOtp();
  let newotp = genrateOtp();
  const now = Date.now();
  const expiresAt = now + 30 * 1000;
  let data = { email, otp, expiresAt };
  let max_limit = 3;
  let currentTime = Date.now();
  sendEmail(email,data?.otp)
  let limit_obj = {
    email: email,
    count: 1,
    lastRequest: now + 20 * 1000,
  };

  let findlimt_email = (limit_arr ?? []).find((item) => item.email === email);

  // console.log("findlimt_email123 ", findlimt_email);

  if (findlimt_email?.lastRequest < currentTime) {
    limit_arr = (limit_arr ?? []).filter(
      (i) => i?.email !== findlimt_email?.email
    );
  }
  let findEmail = otp_Data?.find((i) => i.email === email);
  if (findEmail) {
    findEmail.otp = otp;
  } else {
    otp_Data.push(data);
  }

  if (findlimt_email?.email === email) {
    if (findlimt_email?.count < max_limit) {
      findlimt_email.count++;
    } else {
      return res.status(201).json({ message: "ReEnter your otp after 5 mint" });
    }
  }

  if (!findlimt_email) {
    limit_arr.push(limit_obj);
  }

  console.log("limt2 ", limit_arr);

  return res
    .status(201)
    .json({ message: "Generate Otp successfully", otp_Data, limit_arr });
};

const getAll = async (req, res) => {
  const { page = 1, limit = 6, search = "" } = req.query;
  try {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    // const search = req.query.search || "";

    const searchQuery = search
      ? {
          $or: [
            { email: { $regex: search, $options: "i" } },
            { fullName: { $regex: search, $options: "i" } },
          ],
        }
      : {};
    const skip = (page - 1) * limit;

    const data = await User.find(searchQuery).skip(skip).limit(limit);

    const total = await User.countDocuments(searchQuery);
    const totalPages = Math.ceil(total / limit);
    res.status(201).json({
      data,
      page,
      totalPages,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error in fetching all Data" });
  }
};

export {
  register,
  login,
  update,
  delete_User,
  updateEmail,
  otp_generator,
  getAll,
};
