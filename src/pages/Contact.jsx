import AnnouncementBar from '../components/AnnouncementBar';
// 1. Toast library import ki
import toast, { Toaster } from 'react-hot-toast';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .contact-page {
    min-height: 100vh;
    background: #ffffff;
    font-family: 'Jost', sans-serif;
    color: #1a1a1a;
    padding: 80px 10%;
  }

  .page-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .page-title {
    font-size: 42px;
    font-family: serif;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .page-subtitle {
    font-size: 14px;
    letter-spacing: 0.1em;
    color: #666;
    text-transform: uppercase;
  }

  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 100px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .contact-info-section {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .info-group-title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  .info-details {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.8;
  }

  .info-details a {
    color: #1a1a1a;
    text-decoration: none;
    transition: opacity 0.3s;
  }

  .info-details a:hover {
    opacity: 0.6;
  }

  /* Form Styling */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .input-group label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight:600;
  }

  .input-group input, 
  .input-group textarea {
    padding: 15px;
    border: 1px solid #e1e1e1;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
  }

  .input-group input:focus, 
  .input-group textarea:focus {
    border-color: #1a1a1a;
  }

  .submit-btn {
    background: #1a1a1a;
    color: white;
    padding: 18px;
    border: none;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 13px;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 10px;
  }

  .submit-btn:hover {
    background: #333;
  }

  @media (max-width: 968px) {
    .contact-container { grid-template-columns: 1fr; gap: 60px; }
    .contact-page { padding: 60px 24px; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

export default function Contact() {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 2. Loading state start hoti hai jab button press ho
    const toastId = toast.loading('Sending message...');
    
    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      subject: e.target[2].value,
      message: e.target[3].value,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // 3. Alert ki jagah Success Toast lagaya aur design ko aapki theme ke mutabiq black & white kiya
        toast.success("Message sent successfully!", {
          id: toastId, // yeh loading wale message ko replace kar dega
          style: {
            border: '1px solid #1a1a1a',
            padding: '16px',
            color: '#1a1a1a',
            fontFamily: 'Jost, sans-serif',
          },
          iconTheme: {
            primary: '#1a1a1a',
            secondary: '#fff',
          },
        });
        e.target.reset(); // Automatically clears the form after a successful send
      } else {
        // 4. Error ke liye Alert hata kar Toast
        toast.error("Something went wrong.", { id: toastId });
      }
    } catch (error) {
      console.error("Error:", error);
      // Catch block ke liye bhi error toast
      toast.error("Server error. Please check your connection.", { id: toastId });
    }
  };

  return (
    <>
      <style>{styles}</style>
      
      {/* 5. Toaster yahan add kiya jo actual popups ko screen par show karta hai */}
      <Toaster position="bottom-right" reverseOrder={false} />
      
      <AnnouncementBar />

      <div className="contact-page">
        <header className="page-header">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">We'd love to hear from you</p>
        </header>

        <div className="contact-container">
          {/* Left Column: Info */}
          <div className="contact-info-section">
            <div>
              <h3 className="info-group-title">Customer Support</h3>
              <div className="info-details">
                <p><strong>Business Hours:</strong><br /> Mon – Sat: 09:00 AM – 02:00 AM</p>
                <p style={{ marginTop: '15px' }}>
                    <strong>Email:</strong><br />
                    <a href="mailto:bagx.pk@gmail.com">bagx.pk@gmail.com</a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="info-group-title">Phone & Chat</h3>
              <div className="info-details">
                <p><strong>Complaint Line:</strong> <a href="tel:+923334766356">+92 333 4766356</a></p>
                <p><strong>Live Support:</strong> <a href="tel:+923334124921">+92 333 4124921</a></p>
              </div>
            </div>
          </div>

          {/* Right Column: Form (Updated with onSubmit) */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label>Name</label>
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Your Email" required />
              </div>
            </div>
            
            <div className="input-group">
              <label>Subject</label>
              <input type="text" placeholder="How can we help?" required />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea rows="6" placeholder="Write your message here..." required></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
}