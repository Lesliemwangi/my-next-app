'use client';

import { useState } from 'react';
import { z } from 'zod';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const registrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export default function Registration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = registrationSchema.safeParse(formData);
      if (!result.success) {
        const errors = result.error.format();
        setFormErrors(errors);
        toast.error("Please correct the highlighted errors.");
        setIsSubmitting(false);
        return;
      }
      setFormErrors({});

      const response = await axios.post('/api/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      toast.success('Registration successful!');
      console.log('Registered successfully:', response.data);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        router.push('/login'); 
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-12">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
      
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl p-8 border border-white/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-white/80 mt-2">Join our community today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              />
              {formErrors.firstName && (
                <p className="text-sm text-red-300 mt-1">{formErrors.firstName._errors[0]}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              />
              {formErrors.lastName && (
                <p className="text-sm text-red-300 mt-1">{formErrors.lastName._errors[0]}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
            />
            {formErrors.email && (
              <p className="text-sm text-red-300 mt-1">{formErrors.email._errors[0]}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
            />
            {formErrors.password && (
              <p className="text-sm text-red-300 mt-1">{formErrors.password._errors[0]}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
            />
            {formErrors.confirmPassword && (
              <p className="text-sm text-red-300 mt-1">{formErrors.confirmPassword._errors[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 mt-4 rounded-lg font-medium text-white transition-all duration-300 transform shadow-lg backdrop-blur-sm ${
              isSubmitting 
                ? 'bg-white/20 cursor-not-allowed' 
                : 'bg-white/30 hover:bg-white/40 hover:-translate-y-1 hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating your account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-white/80">
              Already have an account?{' '}
              <a href="/login" className="text-white hover:text-white/90 font-medium underline">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}