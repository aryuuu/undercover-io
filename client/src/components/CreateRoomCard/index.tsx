import React from 'react';
import {
  FiPlus,
  FiMinus
} from 'react-icons/fi';

interface Prop {

};


const CreateRoomCard = (props: Prop) => {
  return (
    <form>
      <div className="fr c-container">
        <p>Player</p>
        <FiMinus className="c-item"/>
        <input type="number" min="4" defaultValue="4" size={2}/>
        <FiPlus className="c-item"/>
      </div>
      <div className="fr c-container">
        <p>Undercover</p>
        <FiMinus className="c-item"/>
        <input type="number" min="1" defaultValue="1" size={2}/>
        <FiPlus className="c-item"/>
      </div>
      <div className="fr c-container">
        <p>Mr. White</p>
        <FiMinus className="c-item"/>
        <input type="number" min="0" defaultValue="0" size={2}/>
        <FiPlus className="c-item"/>
      </div>
      <div className="fr c-container">
        <p>Language</p>
        <input type="radio" id="en" name="language" value="en"/>
        <label htmlFor="en" className="c-item">en</label><br/>
        <input type="radio" id="id" name="language" value="id"/>
        <label htmlFor="id" className="c-item">id</label><br/>
        
      </div>
    </form>
  );
}

export default CreateRoomCard;