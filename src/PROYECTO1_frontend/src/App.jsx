import { useEffect, useState } from 'react';
import { PROYECTO1_backend } from 'declarations/PROYECTO1_backend';
import {Container, Row, Col, Card, CardBody, CardTitle, Table, Button, Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);  
  useEffect(() => {
    getBooks();
  },[]);

  function getBooks(id) {
    Swal.fire("Cargando Los Libros");
    Swal.showLoading();
      PROYECTO1_backend.getAllBooks().then(books=>{
        setBooks(books);
        Swal.close();
      });    
    } 

    function deleteBook(id) {
      Swal.fire("Eliminando Libro(s)");
      Swal.showLoading();
        PROYECTO1_backend.deleteBook(BigInt(id)).then(()=>{
          getBooks();
        });    
      } 
  

  return (
    <Container fluid>
      <Row className='m-7'>
        <Card>
          <Card.Body>
            <Row className='m-3'>
              <Col>
            <CardTitle>Listado De Libros En Existencia</CardTitle>
            </Col>
             <Col>
            <Button className='m-5' variant="success"><Link to='/crear-libro'> Agregar Libro </Link></Button>
            </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titulo</th>
                  <th>Genero</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {
                  books.length > 0 ?
                  books.map((book)=>(
                    <tr>
                      <td>{Number(book.id)}</td>
                      <td>{book.title}</td>
                      <td>{book.genero}</td>
                      <td>{Number(book.rating)}</td>
                      <td>
                        <Row>
                          <Col>
                          <Button variant="danger" onClick={()=>deleteBook(Number(book.id))}>Eliminar</Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                   ))
                  :<tr></tr>
                  
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>

    </Container>
  );
}

export default App;
