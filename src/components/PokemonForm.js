import React, {useState} from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({onPokeSubmit}) {
  const [formData, changeData] = useState({
    name: '',
    hp: 0,
    sprites: {
      front: '',
      back: ''
    }
  });

  function handleFormData(e) {
    if (e.target.name === 'frontUrl') {
      changeData({...formData, sprites: {front: e.target.value, back: formData.sprites.back}});
    }
    else if (e.target.name === 'backUrl') {
      changeData({...formData, sprites: {front: formData.sprites.front, back: e.target.value}});
    }
    else {
      changeData({...formData, [e.target.name]: e.target.name === 'hp' ? 
        parseInt(e.target.value) : e.target.value
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3001/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((r) => r.json())
      .then((newPoke) => {
        onPokeSubmit(newPoke);
        e.target.reset();
        changeData({
          name: '',
          hp: 0,
          sprites: {
            front: '',
            back: ''
          }
        })
      });
  }

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={handleFormData} />
          <Form.Input fluid label="hp" type="number" placeholder="hp" name="hp" onChange={handleFormData} />
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
            onChange={handleFormData}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
            onChange={handleFormData}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
