import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const GroupEdit = () => {
    // log the initial state of the form, all empty
    const initialFormState = {
        name: '',
        address: '',
        city: '',
        stateOrProvince: '',
        country: '',
        postalCode: ''
      };

    // create a new state variable called group, and set its initial value to the initialFormState
    const [group, setGroup] = useState(initialFormState);
    // create a navigate object, which lets you send the user to a new location
    const navigate = useNavigate();
    // get the id of the group from the URL by using the useParams hook
    const { id } = useParams();

    // create a function that will update the group state variable
    // if the parameter isn't new, then it finds the id, calls to the api to 
    // get the group, and sets the group state variable to the data that was fetched
    useEffect(() => {
        if (id !== 'new') {
          fetch(`/api/group/${id}`)
            .then(response => response.json())
            .then(data => setGroup(data));
        }
      }, [id, setGroup]);

    // method to handle form changes
    const handleChange = (event) => {
        const { name, value } = event.target

        setGroup({ ...group, [name]: value })
    }

    // method to handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        //tries to fetch the data from the api
        //checks if group has an id. if it does, it will request /group/id. if not, it will request /group
        await fetch(`/api/group${group.id ? `/${group.id}` : ''}`, {
            // the method will be PUT if the group has an id, and POST if it doesn't
          method: (group.id) ? 'PUT' : 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(group)
        });
        setGroup(initialFormState);
        navigate('/groups');
      }
    
      // variable title that is either EDIT if the group has an id, or ADD if it doesn't
      // reuses the page for both functions, reducing the amount of code needed
    const title = <h2>{group.id ? 'Edit Group' : 'Add Group'}</h2>;

    // render the form
    return (<div>
        <AppNavbar/>
        <Container>
          {title}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" value={group.name || ''}
                     onChange={handleChange} autoComplete="name"/>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input type="text" name="address" id="address" value={group.address || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input type="text" name="city" id="city" value={group.city || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="stateOrProvince">State/Province</Label>
                <Input type="text" name="stateOrProvince" id="stateOrProvince" value={group.stateOrProvince || ''}
                       onChange={handleChange} autoComplete="address-level1"/>
              </FormGroup>
              <FormGroup className="col-md-5 mb-3">
                <Label for="country">Country</Label>
                <Input type="text" name="country" id="country" value={group.country || ''}
                       onChange={handleChange} autoComplete="address-level1"/>
              </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <Label for="country">Postal Code</Label>
                <Input type="text" name="postalCode" id="postalCode" value={group.postalCode || ''}
                       onChange={handleChange} autoComplete="address-level1"/>
              </FormGroup>
            </div>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    )
  };

export default GroupEdit;