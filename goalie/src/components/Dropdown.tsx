import { useState } from 'react';
import './Dropdown.css';

interface DropdownProps {
  setCalendarEvents: (events: { title: string; date: string }[] | ((prevEvents: { title: string; date: string }[]) => { title: string; date: string }[])) => void;
  fetchCalendarEvents: () => Promise<void>;
}

const Dropdown: React.FC<DropdownProps> = ({ setCalendarEvents, fetchCalendarEvents }) => {
  const [selectedHobby, setSelectedHobby] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const handleHobbyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHobby(event.target.value);
  };

  const handleCustomPromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPrompt(event.target.value);
  };

  const sendPromptToBackend = async () => {
    if (!selectedHobby || !customPrompt) return;

    const requestBody = {
      userId: "testUser123",
      hobby: selectedHobby,
      body: {
        text: customPrompt
      }
    };

    try {
      const response = await fetch('https://your-bedrock-api-url.com/createPlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Response from Lambda:", data);

      const rawSuggestions = data.goalSuggestions || [];

      const newEvents = rawSuggestions.map((item: any) => ({
        title: item.activity || "No Activity",
        date: item.date || "No Date"
      }));

      console.log("Mapped new events:", newEvents);

      setCalendarEvents(prevEvents => [...prevEvents, ...newEvents]);

      // 🌀 After prompting Bedrock, fetch fresh from database too!
      await fetchCalendarEvents();

      alert("Prompt sent successfully!");
    } catch (error) {
      console.error("Error sending prompt:", error);
      alert("Prompt failed to send.");
    }
  };

  return (
    <div className="hobby-prompt-selector" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <select onChange={handleHobbyChange} value={selectedHobby}>
        <option value="">Select a Hobby Category</option>
        <option value="Exercise">Exercise</option>
        <option value="Creativity">Creativity</option>
        <option value="Reading">Reading</option>
        <option value="Relaxation">Relaxation</option>
      </select>

      <textarea
        placeholder="Write your own prompt here..."
        value={customPrompt}
        onChange={handleCustomPromptChange}
        rows={6}
        style={{ padding: '10px', width: '100%', resize: 'vertical' }}
      />

      <button
        onClick={sendPromptToBackend}
        disabled={!selectedHobby || !customPrompt}
        style={{ padding: '10px', fontWeight: 'bold' }}
      >
        Send Prompt
      </button>
    </div>
  );
};

export default Dropdown;
