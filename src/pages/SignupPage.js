import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
import { signingUp } from '../utils/firebase/signup';
import { signingIn } from '../utils/firebase/signin';

const SignupPage = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async () => {
        console.log(email, password);
        const response = await signingUp(email, password);
        console.log(response);
        if (!response.message) {
            setUser(response.accessToken);
            // signingIn
            const signedIn = await signingIn(email, password);
            if (!signedIn.message) {
                navigate('/');
            }
        } else {
            console.log('error');
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'email') {
            setEmail(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
    };

    return (
        <section className="relative py-36 bg-black overflow-hidden">
            <img
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                src=""
                alt=""
            />
            {/* src image */}
            <div className="relative z-10 container px-4 mx-auto">
                <div className="mb-8 p-12 max-w-xl mx-auto border border-gray-800 rounded-4xl">
                    <h2
                        className="mb-3 text-5xl text-white text-center font-semibold leading-tight"
                        contenteditable="true"
                    >
                        Sign up
                    </h2>
                    <p className="mb-11 pb-11 font-medium text-center text-lg text-gray-400 leading-normal border-b border-gray-900">
                        Please sign up
                    </p>
                    <form>
                        <label className="block mb-4">
                            <p className="mb-2 text-white font-semibold leading-normal">
                                Email Address
                            </p>
                            <input
                                onChange={(e) => handleInputChange(e)}
                                className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-transparent outline-none border border-gray-800 rounded-lg focus:ring focus:ring-indigo-300"
                                id="email"
                                type="text"
                                placeholder="Enter email address"
                            />
                        </label>
                        <label className="block mb-4">
                            <p className="mb-2 text-white font-semibold leading-normal">
                                Password
                            </p>
                            <input
                                onChange={(e) => handleInputChange(e)}
                                className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-transparent outline-none border border-gray-800 rounded-lg focus:ring focus:ring-indigo-300"
                                id="password"
                                type="password"
                                placeholder="********"
                            />
                        </label>
                        <div className="flex flex-wrap justify-between -m-2 mb-4">
                            <div className="w-auto p-2">
                                <div className="flex items-center"></div>
                            </div>
                            <div className="w-auto p-2">
                                <a
                                    href="/login"
                                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                    Already have an account? Log in.
                                </a>
                            </div>
                        </div>
                        <button
                            onClick={signUp}
                            className="py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                            type="button"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignupPage;