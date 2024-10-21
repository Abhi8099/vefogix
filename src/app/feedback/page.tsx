"use client"

import { useEffect, useState } from 'react'
import { Star, MessageSquare, Check } from 'lucide-react'
import Cookies from 'js-cookie'
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout'
import axios from 'axios'
import { BASE_URL } from '@/utils/api'
import toast from 'react-hot-toast'

interface FeedbackData {
    uid: string
    created_at: string
    updated_at: string
    feedback: string
    star: string
    feedback_by: number
}

export default function FeedbackComponent() {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [feedback, setFeedback] = useState('')
    const [existingFeedback, setExistingFeedback] = useState<FeedbackData | null>(null)
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        const getFeedback = async () => {
            const token = Cookies.get("login_access_token")
            try {
                const response = await axios.get<FeedbackData>(`${BASE_URL}website-feedback/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                // console.log("Feedback data:", response.data)
                setExistingFeedback(response.data)
                setRating(parseFloat(response.data.star))
                setFeedback(response.data.feedback)
            } catch (error: any) {
                console.error('Error fetching feedback:', error.response || error)
            }
        }

        getFeedback()
    }, [])

    const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeedback(event.target.value)
    }

    const submitFeedback = async () => {
        const token = Cookies.get("login_access_token")
        try {
            const response = await axios.post(`${BASE_URL}website-feedback/`, { star: rating, feedback: feedback }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            toast.success("Feedback submitted successfully")
            setExistingFeedback(response.data)
            setIsUpdating(false)
        } catch (error: any) {
            console.error('Error submitting feedback:', error.response || error)
            toast.error("Failed to submit feedback")
        }
    }
 
    const updateFeedback = async () => {
        const token = Cookies.get("login_access_token")
        try {
            const response = await axios.post(`${BASE_URL}website-feedback/`, { star: rating, feedback: feedback }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            // console.log(response);
            
            toast.success("Feedback updated successfully")
            setExistingFeedback(response.data)
            setIsUpdating(false)
        } catch (error: any) {
            console.error('Error updating feedback:', error.response || error)
            toast.error("Failed to update feedback")
        }
    }

    return (
        <DefaultLayout>
            <div className="bg-white flex items-center justify-center w-full relative h-[85vh]">
                <div className="absolute inset-0 z-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23344C92' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }} aria-hidden="true" />

                <div className="w-full max-w-lg bg-white shadow-xl z-10 rounded-lg p-6 backdrop-blur-md">
                    <h2 className="text-2xl font-bold text-black text-center">Feedback</h2>
                    <p className="text-center text-gray-600">We value your opinion on our services</p>

                    {existingFeedback && !isUpdating ? (
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-center text-[#344C92]">
                                <Check className="w-16 h-16" />
                            </div>
                            <p className="text-center text-lg font-semibold">Feedback has been submitted</p>
                            <div className="flex justify-center">
                                {[...Array(5)].map((_, index) => (
                                    <Star
                                        key={index}
                                        className={`w-8 h-8 ${index < parseFloat(existingFeedback.star) ? 'text-[#344C92] fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-center">{existingFeedback.feedback}</p>
                            <button
                                onClick={() => setIsUpdating(true)}
                                className="mt-4 w-full bg-[#344C92] hover:bg-[#2a3d75] text-white transition-all duration-200 transform hover:scale-105 py-2 rounded"
                            >
                                Update Feedback
                            </button>
                        </div>
                    ) : (
                        <div className="mt-6 space-y-10">
                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-black">
                                    Your Satisfaction
                                </label>
                                <div className="flex justify-center" id="rating">
                                    {[...Array(5)].map((_, index) => {
                                        const ratingValue = index + 1
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={`${ratingValue <= (hover || rating) ? 'text-[#344C92]' : 'text-gray-300'
                                                    } text-3xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#344C92] focus:ring-offset-2 rounded-full`}
                                                onClick={() => setRating(ratingValue)}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(0)}
                                                aria-label={`Rate ${ratingValue} out of 5 stars`}
                                            >
                                                <Star className="w-8 h-8 fill-current" />
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="feedback" className="block text-sm font-medium text-black">
                                    Additional Feedback
                                </label>
                                <div className="relative mt-2">
                                    <textarea
                                        id="feedback"
                                        placeholder="We value your feedback! Please share your thoughts..."
                                        className="min-h-[100px] pl-10 resize-none border text-black border-gray-300 focus:border-[#344C92] focus:ring-[#344C92] rounded-md w-full outline-none p-2"
                                        value={feedback}
                                        onChange={handleFeedbackChange}
                                    />
                                    <MessageSquare className="absolute top-3 left-3 text-gray-400" />
                                </div>
                            </div>

                            <button
                                onClick={existingFeedback ? updateFeedback : submitFeedback}
                                className="mt-4 w-full bg-[#344C92] hover:bg-[#2a3d75] text-white transition-all duration-200 transform hover:scale-105 py-2 rounded"
                            >
                                {existingFeedback ? 'Update Feedback' : 'Submit Feedback'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    )
}