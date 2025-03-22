import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    // Fetch reviews from the backend
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/review/${id}/get-all-reviews`);
        console.log('responseeeee',response)
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-5">
      <h1>Reviews</h1>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review-card p-2 pt-3  ">
            <h2>User: {review.user?.email || "Unknown"}</h2>
            <p>rating: {review.rating || "N/A"}</p>
            <p>comment: {review.comment|| "No review text provided"}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewPage;
