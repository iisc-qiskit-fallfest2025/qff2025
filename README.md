# IISc Qiskit Fall Fest 2025

A quantum computing educational website for the **IISc Qiskit Fall Fest 2025** event hosted on GitHub Pages.

## 🚀 Features

- **Interactive Website**: Modern, responsive design showcasing the Quantum Fall Fest event
- **Certificate Generation**: Automated certificate generation for participants and winners
- **Registration Verification**: Real-time email verification against registration database
- **Educational Materials**: Jupyter notebooks with Qiskit tutorials and hands-on exercises
- **Quantum Challenges**: Interactive challenges for learning quantum computing concepts
- **Leaderboard**: Real-time challenge leaderboard

## 📁 Project Structure

```text
qff2025/
├── index.html              # Main landing page
├── challenge.html          # Quantum challenges page
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript functionality
├── challenge.js            # Challenge-specific JavaScript
├── registration-check.js   # Registration verification utility
├── assets/                 # Images and visual assets
└── material/               # Educational content (Jupyter notebooks, slides)
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (GitHub Pages)
- **Backend**: Google Cloud Functions (Gen 2)
- **Services**:
  - Certificate Generator (Cloud Run)
  - Registration Checker (Cloud Function)
  - Challenge Submission (Cloud Run)
  - Leaderboard (Cloud Run)
- **Storage**: Google Cloud Storage
- **Quantum Computing**: Qiskit, Jupyter Notebooks

## 🌐 Deployment

This website is deployed on **GitHub Pages** and uses GCP Cloud Functions for backend operations:

### Frontend (GitHub Pages)
```bash
# Simply push to the main branch
git push origin main
```

### Backend Functions (Already Deployed)
- **Certificate Generator**: `https://certificate-generator-916823407631.us-central1.run.app`
- **Registration Check**: `https://check-registration-ab3dammvgq-uc.a.run.app`
- **Submit Challenge**: `https://submit-challenge-916823407631.us-central1.run.app`
- **Leaderboard**: `https://get-leaderboard-916823407631.us-central1.run.app`

## 📝 Configuration

All backend endpoints are configured in the JavaScript files:
- `script.js` - Certificate API endpoint
- `registration-check.js` - Registration verification endpoint
- `challenge.js` - Challenge submission and leaderboard endpoints

No additional configuration needed for GitHub Pages deployment.

## 📚 Educational Materials

The `material/` directory contains:
- **Qiskit 101 Hands-on**: Introduction to quantum computing with Qiskit
- **Live Coding Sessions**: Interactive coding examples
- **Speaker Slides**: Presentation materials from expert speakers

## 🚀 Deployment

This project is configured for deployment on Google Cloud App Engine:

1. Install Google Cloud SDK
2. Run `gcloud app deploy`
3. The app will be available at your App Engine URL

## 🎯 About Qiskit Fall Fest

Qiskit Fall Fest is a collection of quantum computing events that take place across the globe. This specific implementation is for the **IISc (Indian Institute of Science)** event, featuring:

- Educational workshops on quantum computing
- Hands-on coding sessions with Qiskit
- Expert talks from industry professionals
- Interactive challenges and competitions

## 🤝 Contributing

This project was created for the IISc Qiskit Fall Fest 2025. Feel free to fork and adapt for your own quantum computing educational events.

## 📄 License

This project is part of the Qiskit Fall Fest initiative. Please check with the organizers for specific licensing terms.

---

Built with ❤️ for the quantum computing community