import React, {useState, useEffect} from "react";// Import Form component from react-bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Sidebar from "./Sidebar";
import swal from "sweetalert";



function Facilitiesdash() {
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [Facilities, setFacilities] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [facilityid, setFacilityid] = useState("");

    useEffect(() => {
        const getFacilities = async () => {
            const response = await fetch("http://localhost:8000/facility/view/");
            const data = await response.json();
            setFacilities(data);
        };
        getFacilities();
        
    }, []);

    



    const handleFacilities = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);

        let addFacilities = "http://localhost:8000/facility/facilities/";

        let addFacilitiesResponse = await fetch(addFacilities, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        let parsedData = await addFacilitiesResponse.json();
        console.log(parsedData);
        console.log(formData);

        if (addFacilitiesResponse.status === 200) {
            swal({
                title: "Facility Added Successfully",
                icon: "success",
                button: "Ok",
            })
            window.location.reload();
        } else {
            if (parsedData.name) {
                alert("Facility Name is required");
            } else if (parsedData.description) {
                alert("Description is required");
            } else if (parsedData.price) {
                alert("Price is required");
            } else if (parsedData.image) {
                alert("Image is required");
            }
        }
    }

    const handleFacilitiesDelete = async (id) => {
      let response = await fetch(`http://localhost:8000/facility/delete/${id}/`, {
          method: "POST",
          credentials: "include",
      });

      let parsedData = await response.json();
      console.log(parsedData);

      if (response.status === 200) {
          swal({
              title: "Facility Deleted Successfully",
              icon: "success",
              button: "Ok",
          })
          setFacilities([Facilities, parsedData])
          // window.location.reload();
      } 
  };


    const handleFacilityEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);

        let response = await fetch(`http://localhost:8000/facility/edit/${facilityid}/`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        let parsedData = await response.json();
        console.log(parsedData);

        if (response.status === 200) {
            alert("Facility Updated Successfully");
            window.location.reload();
        } 
    };


                


    const openModal = (Facility) => {
        setmodalIsOpen(true);
        setName(Facility.name);
        setDescription(Facility.description);
        setPrice(Facility.price);
        setFacilityid(Facility.id);

    }

    const closeModal = () => {
        setmodalIsOpen(false);
    }
  return (
    <div>
      <div className="App">
        <Sidebar />
        <div className="content">
          <h2 className="mb-3 text-start">Add Facilities</h2>
          <form>
            <div className="row">
              <div className="col">
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Facility Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Facility Name" 
                  value={name} onChange={(e) => setName(e.target.value)} />
                  
                  
                </Form.Group>
              </div>

              <div className="col">
                {" "}
                {/* Added missing opening div tag */}
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicDescription"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    value={description} onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicPrice"
                >
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" placeholder="Enter Price" 
                  value={price} onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicImage"
                >
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" 
                   onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                   }}
                  
                  />
                </Form.Group>
              </div>
            </div>
            <Button variant="primary" type="submit" onClick={handleFacilities}>
                Add Facilities
            </Button>
          </form>

          <h2 className="mt-5 mb-3 text-start">Facilities Details</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>

            <tbody>
              {Facilities.map((Facility) => (
                <tr key={Facility.id}>
                  <td>{Facility.name}</td>
                  <td>{Facility.description}</td>
                  <td>{Facility.price}</td>
                  <td>
                    <img src={Facility.image} width={"200px"} alt="" />
                  </td>
                  <td>
                    <button className="btn btn-primary" onClick={() => {openModal(Facility)}}>Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleFacilitiesDelete(Facility.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="modal">
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                <Modal.Title>Facilities</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Facility Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Facility Name"
                            value={name} onChange={(e) => setName(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" 
                            value={description} onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder="Enter Price" 
                            value={price} onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Button variant="primary" type="submit" 
                onClick={handleFacilityEdit}
                
                >
                    Update Facilities
                </Button>




            </Modal>

                
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facilitiesdash;
