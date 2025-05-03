import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Function to display relative time (e.g., "created 6 minutes ago")
const getTimeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (let i = 0; i < intervals.length; i++) {
        const interval = Math.floor(seconds / intervals[i].seconds);
        if (interval >= 1) {
            return `created ${interval} ${intervals[i].label}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
};

const RecipeCard = ({ onRecipeAdded }) => {
    const [image, setImage] = useState(null);

    // fonction d'image
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const storedUser = localStorage.getItem("userData");
            const parsedUser = storedUser ? JSON.parse(storedUser) : null;
            const author = parsedUser?.username || "Anonymous";  // Retrieve username from localStorage

            const now = new Date();
            const createdAt = now.toISOString();
            const createdRelative = getTimeAgo(now);

            const recipeData = {
                ...values,
                image,
                author,
                createdAt,
                createdRelative,
            };

            const response = await axios.post('http://localhost:3000/recipes', recipeData);
            console.log('recette posted:', response.data);

            if (onRecipeAdded) {
                onRecipeAdded(response.data);
            }

            resetForm();
            setImage(null);
        } catch (error) {
            console.error('Error posting recipe:', error);
            alert('Failed to post recipe.');
        }
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(100, "Title must be at most 100"),
         origine: Yup.string()
            .required('origine is required')
            .min(2, 'origine must be at least 2 characters'),
        ingridient: Yup.string()
            .required('ingridient is required')
            .min(10, 'ingridient must be at least 10 characters'),
        etapes: Yup.string()
            .required('etapes is required')
            .min(10, 'etapes must be at least 10 characters'),
    });

    return (
        <div className="w-full text-white ">
            <Formik
                initialValues={{
                    title: '',
                    origine: '',
                    ingridient: '',
                    etapes:'',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors, setFieldValue, values, isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium mb-1 text-white">Title</label>
                            <Field
                                id="title"
                                type="text"
                                name="title"
                                className={`bg-[#f6e9d7] text-black p-2 w-full rounded border ${touched.title && errors.title ? 'border-red-500' : 'border-[#7d6a5c]'}`}
                            />
                            <ErrorMessage name="title" component="div" className="text-red-300 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="origine" className="block text-sm font-medium mb-1 text-white">Origine</label>
                            <input
                                id="origine"
                                type="text"
                                name="origine"
                                value={values.origine}
                                onChange={(e) => setFieldValue('origine', e.target.value)}
                                className={`bg-[#f6e9d7] text-black p-2 w-full rounded border ${touched.origine && errors.origine ? 'border-red-500' : 'border-[#7d6a5c]'}`}
                            />
                            <ErrorMessage name="origine" component="div" className="text-red-300 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="ingridient" className="block text-sm font-medium mb-1 text-white">Ingridients</label>
                            <Field
                                as="textarea"
                                id="ingridient"
                                name="ingridient"
                                rows="4"
                                className={`bg-[#f6e9d7] text-black p-2 w-full rounded border ${touched.ingridient && errors.ingridient ? 'border-red-500' : 'border-[#7d6a5c]'}`}
                            />
                            <ErrorMessage name="ingridient" component="div" className="text-red-300 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="etapes" className="block text-sm font-medium mb-1 text-white">Les étapes suivi</label>
                            <Field
                                as="textarea"
                                id="etapes"
                                name="etapes"
                                rows="4"
                                className={`bg-[#f6e9d7] text-black p-2 w-full rounded border ${touched.etapes && errors.etapes ? 'border-red-500' : 'border-[#7d6a5c]'}`}
                            />
                            <ErrorMessage name="etapes" component="div" className="text-red-300 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="image-upload" className="block text-sm font-medium mb-1 text-white">Upload Image</label>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="text-white file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#566c40] file:text-white hover:file:bg-[#A1C181]"
                            />
                            {image && (
                                <img
                                    src={image}
                                    alt="Selected preview"
                                    className="mt-4 w-32 h-32 object-cover rounded border border-[#7d6a5c]"
                                />
                            )}
                        </div>

                        <div className="flex items-center justify-end p-4 border-t border-[#7d6a5c] rounded-b">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="text-white bg-[#566c40] hover:bg-[#A1C181] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                            <button
                                type="button"
                                onClick={() => onRecipeAdded && onRecipeAdded()}
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-[#7d6a5c] rounded-lg border border-[#5a4c40] hover:bg-[#5a4c40]"
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RecipeCard;