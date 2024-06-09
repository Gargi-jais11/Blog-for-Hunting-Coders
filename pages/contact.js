import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/Contact.module.css';

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ phone, name, desc, email });
    const data = { phone, name, email, desc };

    try {
      const response = await fetch('http://localhost:3000/api/postcontact', {  // Corrected to http
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.text();
        console.log('Success:', result);
        alert('Thanks for contacting us. We will respond to you soon.');
        setName('');
        setPhone('');
        setEmail('');
        setDesc('');
      } else {
        console.error('Error:', response.statusText);
        alert('There was an issue submitting your contact information. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your contact information. Please check your network connection and try again.');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'desc':
        setDesc(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className={`container d-flex justify-content-center align-items-center ${styles.contactContainer}`}>
      <div className="col-md-6 my-5">
        <h1 className="mb-4 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Enter your name</label>
            <input type="text" value={name} onChange={handleChange} className="form-control" id="name" name="name" aria-describedby="nameHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" value={email} onChange={handleChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text-light">We will never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="text" value={phone} onChange={handleChange} className="form-control" id="phone" name="phone" />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Elaborate your concern</label>
            <textarea
              className="form-control"
              value={desc}
              onChange={handleChange}
              id="desc"
              name="desc"
              placeholder="Write your concern here"
              rows="4"
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
