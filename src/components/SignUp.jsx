/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import { EyeOutlined, EyeInvisibleOutlined, CheckOutlined } from "@ant-design/icons";

const nameRegex = /^[0-9A-Za-z\s]{6,16}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/

const SignUp = function() {
    const [inputType, setInputType] = useState(false);

    const [errors, setErrors] = useState({
        nameError: '',
        emailError: '',
        phoneError: '',
        passError: '',
        imageError: '',
        success: '',
    });

    const [file, setFile] = useState();
    const [auth, setAuth] = useState('signup');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        image: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name == 'name') {
            if (nameRegex.test(e.target.value) || e.target.value == '') {
                setErrors((errors) => ({
                    ...errors,
                    nameError: false
                }));
            }else if (!nameRegex.test(e.target.value)) {
                setErrors((errors) => ({
                    ...errors,
                    nameError: true
                }));
            }
        }
        
        if (e.target.name == 'email') {
            if (emailRegex.test(e.target.value) || e.target.value == '') {
                setErrors((errors) => ({
                    ...errors,
                    emailError: false
                }));
            }else if (!emailRegex.test(e.target.value)) {
                setErrors((errors) => ({
                    ...errors,
                    emailError: true
                }));
            }
        }
        
        if (e.target.name == 'phone') {
            if (phoneRegex.test(e.target.value) || e.target.value == '') {
                setErrors((errors) => ({
                    ...errors,
                    phoneError: false
                }))
            }else if (!phoneRegex.test(e.target.value)) {
                setErrors((errors) => ({
                    ...errors,
                    phoneError: true
                }))
            }
        }

        if (e.target.name == 'password') {
            if (passRegex.test(e.target.value) || e.target.value == '') {
                setErrors((errors) => ({
                    ...errors,
                    passError: false
                }))
            }else if (!passRegex.test(e.target.value)) {
                setErrors((errors) => ({
                    ...errors,
                    passError: true
                }))
            }
        }
        
      };

    const typeHandler = function() {
        setInputType(!inputType)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setFormData({ ...formData, image: file });
        setFile(URL.createObjectURL(file));
        console.log(file)
        if (!file) {
            setErrors((errors) => ({
                ...errors,
                imageError: true
            }));
        }else {
            setErrors((errors) => ({
                ...errors,
                imageError: false
            }))
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("password", formData.password);
        data.append("image", formData.image);
    
        if (!formData.image) {
            setErrors((errors) => ({
                ...errors,
                imageError: true
            }));
        }
            const response = await fetch("https://www.appssquare.sa/api/submit", {
                method: "POST",
                body: data,
            });
            
            const result = await response.json();
            console.log(result);
            setErrors((errors) => ({
                ...errors,
                success: true
            }));
}
useEffect(() => {
    if (errors.success) {
        const timer = setTimeout(() => {
            setErrors((errors) => ({
                ...errors,
                success: false
            }));
        }, 3000);
        console.log(timer)
        return () => clearTimeout(timer);
    }
}, [errors.success]);

if (auth === 'signin') {
    return <SignIn />
}

    
    return (
        <>
    <div className="flex flex-col justify-center items-center bg-[url(public/blurry-shot-interior-shopping-mall.jpg)] h-fit bg-center bg-cover">
        <form onSubmit={handleSubmit} className="my-8 flex flex-col rounded-[5px] bg-white p-4 sm:p-8 w-[90%] max-w-[576px] border-l-4 border-[#1C65A2]">

        <div>
            <h1 className="font-bold text-5xl text-[#606362]"><span className="text-[#1C65A2]">E</span>square²</h1>
            <div className="my-8">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-[#606362]">Enter to get access to our products and services</p>
            </div>
        </div>

        <div className="flex flex-col space-y-4">
            <div>
            <label htmlFor="name" className="font-semibold text-sm">Name <span className="text-red-600">*</span></label>
            <input onChange={handleChange} name="name" type="text" id="name" placeholder="Enter your name" required className="peer p-2 w-full border-2 border-[#E5E7EB] rounded-[5px] block placeholder:text-xs focus:outline-none"/>
            {errors.nameError ? <span id="nameAlert" className="text-xs text-red-600">Username should be 6-16 characters and shouldn't include any special characters</span> : null}
            </div>

            <div>
            <label htmlFor="email" className="font-semibold text-sm">Email <span className="text-red-600">*</span></label>
            <input onChange={handleChange} name="email" type="email" id="email" placeholder="Enter your email" required className="p-2 w-full border-2 border-[#E5E7EB] rounded-[5px] block placeholder:text-xs focus:outline-none"/>
            {errors.emailError ? <span className="text-xs text-red-600">It should be a valid email address</span> : null}
            </div>

            <div className="relative">
            <label htmlFor="phone" className="font-semibold text-sm">Phone number <span className="text-red-600">*</span></label>
            <input onChange={handleChange} name="phone" type="tel" id="phone" placeholder="Enter phone number" required className="p-2 w-full border-2 border-[#E5E7EB] rounded-[5px] block placeholder:text-xs focus:outline-none"/>
            {errors.phoneError ? <span id="nameAlert" className="text-xs text-red-600">Enter a valid phone number</span> : null}
            </div>

            <div className="relative">
            <label htmlFor="password" className="font-semibold text-sm">Password <span className="text-red-600">*</span></label>
            <input onChange={handleChange} name="password" type={inputType ? 'text' : 'password'} id="password" placeholder="Enter password" required className="p-2 w-full border-2 border-[#E5E7EB] rounded-[5px] block placeholder:text-xs focus:outline-none"/>
            {inputType ? <EyeInvisibleOutlined className="absolute top-9 left-[calc(100%_-_32px)] text-xl" onClick={typeHandler}/> : <EyeOutlined className="absolute top-9 left-[calc(100%_-_32px)] text-xl" onClick={typeHandler}/>}
            {errors.passError ? <span className="text-xs text-red-600">Password should be 8-20 characters and include atleast 1 letter, 1 number and 1 special character</span> : null}
            </div>
        </div>

        <div className="flex flex-col justify-center items-center relative">
        <div className="mt-8 mb-4"> 
        <label htmlFor="image" className="w-32 block bg-[#E5E7EB] p-2 text-center rounded-[5px] cursor-pointer">Select image</label>  
        <div className="flex justify-center items-center mt-2 w-32">
        <input onChange={handleImageChange} name="image" type="file" id="image" accept="image/*" className={`${file ? `block` : 'hidden'} overflow-hidden w-[88px] file:hidden text-xs`}/>
        {file && <img className=" w-10 h-10" src={file} alt="" />}
        {errors.imageError && <div className="text-[10px] text-red-600">Please select your image</div>}
        </div> 
        </div>
        <input type="submit" value="Sign Up" className="text-white p-2 cursor-pointer rounded-[5px] w-32 bg-[#1C65A2]"/>
        </div>

        <div className="mt-6">
            <p onClick={() => setAuth('signin')} className="cursor-pointer text-xs text-center text-[#1C65A2]">You already have an account plaese sign in</p>
        </div>
        </form>

    {!errors.imageError &&
        <div className={`fixed top-[-20px] mx-auto p-2 bg-[#1C65A2] rounded-[5px] space-x-2 w-[80%] sm:max-w-[400px] text-base ${errors.success ? 'animate-success' : 'hidden-success'}`}>
    <CheckOutlined className="text-white" />
    <p className="inline-block text-white">Success!</p>
    </div>}

    </div>

    </>
)}

export default SignUp;