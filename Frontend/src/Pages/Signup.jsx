import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';

function FormModal() {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // Track the step in the signup process
  const [preferences, setPreferences] = useState([]); // Store user selections
  const [profilePicture, setProfilePicture] = useState(null); // Store profile picture
  const [aadharCard, setAadharCard] = useState(null); // Store Aadhar card

  const toggleSignup = () => {
    setIsLoginActive(false);
    setCurrentStep(1); // Reset step to 1 when toggling
  };
  

  const toggleLogin = () => {
    setIsLoginActive(true);
  };

  const handleLoginSubmit = () => {
    console.log("HandleLoginSubmit Called");
    fetch('http://localhost:3456/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email":email,
        "password":password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const uploadUserData = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', username);
      formData.append('password', password);
      formData.append('interest', JSON.stringify(preferences)); // Convert array to string
      formData.append('gender', gender);
      
      // Append the file
      const file = profilePicture.files[0]; // Assuming fileInput is a file input element
      formData.append('pfp', file);
  console.log(profilePicture);
      const response = await fetch("http://localhost:3456/api/v1/users/register", {
        method: 'POST', headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignupSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', username);
      formData.append('password', password);
      formData.append('interest', JSON.stringify(preferences));
      formData.append('gender', gender);
  console.log(profilePicture);
      // Append the files
      if (profilePicture) formData.append('pfp', profilePicture);
      
      const response = await fetch('http://localhost:3456/api/v1/users/register', {
        method: 'POST',
        body: formData, // No need to set Content-Type header
      });
  
      const data = await response.json();
      setIsLoginActive(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleNextClick = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreferenceChange = (event) => {
    const value = event.target.value;
    setPreferences((prev) => 
      prev.includes(value) 
      ? prev.filter((pref) => pref !== value) 
      : [...prev, value]
    );
  };

  const handleProfilePictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      setProfilePicture(event.target.files[0]);
    }
  };
  
  const handleAadharCardChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAadharCard(event.target.files[0]);
    }
  };
  

  const handleUpload = async () => {
    if (!profilePicture) {
        return alert('Please select a file to upload.');
    }

    const formData = new FormData();
    formData.append('pfp', profilePicture);

    try {
        const response = await axios.post('/cloudinarylink', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Required for file uploads
            },
        });
        
        // Update state on successful upload
        console.log('Cloudinary response:', response.data);
        // Handle successful response (e.g., display uploaded image URL)
    } catch (error) {
      // Update state on upload error
        console.error('Upload error:', error);
        // Handle upload error (e.g., display error message)
    }
};

  return (
    <div className='back'>
      <div className="form-modal">
        <div className="form-toggle">
          <button
            id="login-toggle"
            onClick={toggleLogin}
            style={{
              backgroundColor: isLoginActive ? '#172330' : '#fff',
              color: isLoginActive ? '#fff' : '#222',
            }}
          >
            Log in
          </button>
          <button
            id="signup-toggle"
            onClick={toggleSignup}
            style={{
              backgroundColor: !isLoginActive ? '#172330' : '#fff',
              color: !isLoginActive ? '#fff' : '#222',
            }}
          >
            Sign Up
          </button>
        </div>

        {isLoginActive ? (
          <div id="login-form">
            <form>
              <input
                type="text"
                placeholder="Enter email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="btn login" onClick={handleLoginSubmit}>
                Login
              </button>
              <p>
                <a href="javascript:void(0)">Forgotten account</a>
              </p>
              <hr />
            </form>
          </div>
        ) : (
          <div id="signup-form">
            <form>
              {currentStep === 1 && (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Choose username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="radio-group">
                    <label htmlFor="male">Male:</label>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                    />
                    <label htmlFor="female">Female:</label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                    />
                    <label htmlFor="other">Other:</label>
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      checked={gender === 'other'}
                      onChange={() => setGender('other')}
                    />
                  </div>
                  <button type="button" className="btn next" onClick={handleNextClick}>
                    Next
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="checkbox-group">
                    <label className="option-label">
                      <input
                        type="checkbox"
                        value="Option 1"
                        onChange={handlePreferenceChange}
                        checked={preferences.includes('Option 1')}
                      />
                      Valorant
                    </label>
                    <label className="option-label">
                      <input
                        type="checkbox"
                        value="Option 2"
                        onChange={handlePreferenceChange}
                        checked={preferences.includes('Option 2')}
                      />
                      CSGO
                    </label>
                    <label className="option-label">
                      <input
                        type="checkbox"
                        value="Option 3"
                        onChange={handlePreferenceChange}
                        checked={preferences.includes('Option 3')}
                      />
                      GTA
                    </label>
                    <label className="option-label">
                      <input
                        type="checkbox"
                        value="Option 4"
                        onChange={handlePreferenceChange}
                        checked={preferences.includes('Option 4')}
                      />
                      Cyberpunk
                    </label>
                    <label className="option-label">
                      <input
                        type="checkbox"
                        value="Option 5"
                        onChange={handlePreferenceChange}
                        checked={preferences.includes('Option 5')}
                      />
                      Chess
                    </label>
                    <label className="option-label">
                      <input
                        type="checkbox"
                        value="Option 6"
                        onChange={handlePreferenceChange}
                        checked={preferences.includes('Option 6')}
                      />
                      Monopoly
                    </label>
                    <label className="option-label">
                      <input
                        type="checkbox"
                        value="Option 7"
                        onChange={handlePreferenceChange}
                        checked={preferences.includes('Option 7')}
                      />
                      PUBG
                    </label>
                  </div>
                  <button type="button" className="btn next" onClick={handleNextClick}>
                    Next
                  </button>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div className="file-upload-group">
                  <label className="file-upload">
  Upload Profile Picture
  <input type="file" onChange={handleProfilePictureChange} />
</label>
<label className="file-upload">
  Upload Aadhar Card
  <input type="file" onChange={handleAadharCardChange} />
</label>

                  </div>
                  <button type="button" className="btn signup" onClick={handleSignupSubmit}>
                    Create Account
                  </button>
                </>
              )}

              <p>
                Clicking <strong>Create Account</strong> means that you agree to
                our <a href="javascript:void(0)">terms of services</a>.
              </p>
              <hr />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormModal;
