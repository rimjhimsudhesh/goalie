import { useState } from 'react';
import './Dropdown.css';

const Dropdown = () => {
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [selectedHobby, setSelectedHobby] = useState('');
  
    const prompts = {
      Exercise: "Give me a motivating running goal for today.",
      Creativity: "Suggest a small creative project I can do today.",
      Reading: "Give me a book to read for 15 minutes today.",
      Relaxation: "Suggest a calming self-care activity for today."
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedHobby(event.target.value);
      setSelectedPrompt(prompts[event.target.value as keyof typeof prompts]);
    };
  
    const sendPromptToBackend = async () => {
      if (!selectedHobby || !selectedPrompt) return;
  
      const requestBody = {
        userId: "testUser123",  
        hobby: selectedHobby,
        body: {
          text: selectedPrompt
        }
      };
  
      try {
        const response = await fetch('https://nea6ak5jj2.execute-api.us-west-2.amazonaws.com/createPlan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });
  
        const data = await response.json();
        console.log("Response from Lambda:", data);
        console.log("goalSuggestions:", data.goalSuggestions);
        console.log("L array:", data.goalSuggestions?.L);
        console.log("first item in L:", data.goalSuggestions?.L?.[0]);
        alert("Prompt sent successfully!");
      } catch (error) {
        console.error("Error sending prompt:", error);
        alert("Prompt failed to send.");
      }
    };
  
    return (
      <div className="hobby-prompt-selector">
        <select onChange={handleChange} value={selectedHobby}>
          <option value="">Select a Hobby Category</option>
          {Object.keys(prompts).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
  
        <button onClick={sendPromptToBackend} disabled={!selectedPrompt}>
          Send Prompt
        </button>
      </div>
    );
  };
  
export default Dropdown;
