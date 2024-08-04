import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const GroupList = () => {

    // create a new state variable called groups, and set its initial value to an empty list
  const [groups, setGroups] = useState([]);
  // create a new state variable called loading, and set its initial value to false
  const [loading, setLoading] = useState(false);

  //on interaction with the component, the useEffect hook will be called
  useEffect(() => {
    //loading to true as the data is being fetched
    setLoading(true);

    // fetch the data from the API
    fetch('/api/groups')
      // convert the response to JSON, and put the data in the groups state variable
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
        // set loading to false when the data is fetched  
        setLoading(false);
      })
  }, []);

  // remove a group from the list
  const remove = async (id) => {
    //go to the API endpoint for deleting a group
    await fetch(`/api/group/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      // remove the group from the list of groups
    }).then(() => {
     //make a new list of groups that excludes the group that was just deleted
      let updatedGroups = [...groups].filter(i => i.id !== id);
        //set the list of groups to the new list
      setGroups(updatedGroups);
    });
    }

    // if the data is still loading, display a loading message
    if (loading) {
        return <p>Loading...</p>;
      }

    // render the list of groups in a table
    const groupList = groups.map(group => {
        // convert the address to a string
    const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;

    // return a table row with the group name, address, events, and actions
    return <tr key={group.id}>
        <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
        <td>{address}</td>
        <td>{group.events.map(event => {
        return <div key={event.id}>{new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }).format(new Date(event.date))}: {event.title}</div>
        })}</td>
        <td>
        <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => remove(group.id)}>Delete</Button>
        </ButtonGroup>
        </td>
    </tr>
    });

    // navbar and table display
    return (
        <div>
          <AppNavbar/>
          <Container fluid>
            <div className="float-end">
              <Button color="success" tag={Link} to="/groups/new">Add Group</Button>
            </div>
            <h3>My JUG Tour</h3>
            <Table className="mt-4">
              <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Location</th>
                <th>Events</th>
                <th width="10%">Actions</th>
              </tr>
              </thead>
              <tbody>
              {groupList}
              </tbody>
            </Table>
          </Container>
        </div>
      );
};

export default GroupList;