'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   IconButton,
//   InputLabel,
//   FormControl
// } from '@mui/material';
// import { IconPlus, IconTrash } from '@tabler/icons-react';

// const CrudPage = () => {
//   const [parents, setParents] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     name: '',
//     phone: '',
//     gender: '',
//     address: '',
//     children: []
//   });

//   useEffect(() => {
//     fetchParents();
//   }, []);

//   const fetchParents = async () => {
//     const response = await fetch('/api/database/crud/parents');
//     const data = await response.json();
//     setParents(data);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddChild = () => {
//     setFormData({
//       ...formData,
//       children: [
//         ...formData.children,
//         { name: '', gender: '', age: '', checkIn: '', checkOut: '', facePhotos: [] }
//       ]
//     });
//   };

//   const handleRemoveChild = (index) => {
//     const updatedChildren = formData.children.filter((_, i) => i !== index);
//     setFormData({ ...formData, children: updatedChildren });
//   };

//   const handleChildInputChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedChildren = formData.children.map((child, i) => 
//       i === index ? { ...child, [name]: value } : child
//     );
//     setFormData({ ...formData, children: updatedChildren });
//   };

//   const handleFileChange = (index, files) => {
//     const updatedChildren = formData.children.map((child, i) => 
//       i === index ? { ...child, facePhotos: Array.from(files).slice(0, 10) } : child
//     );
//     setFormData({ ...formData, children: updatedChildren });
//   };

//   const handleSubmit = async () => {
//     const formDataWithImages = {
//       ...formData,
//       children: await Promise.all(
//         formData.children.map(async (child) => {
//           const facePhotos = await Promise.all(
//             child.facePhotos.map(async (file) => {
//               const reader = new FileReader();
//               return new Promise((resolve) => {
//                 reader.onload = () => resolve(reader.result);
//                 reader.readAsDataURL(file);
//               });
//             })
//           );
//           return { 
//             ...child, 
//             age: parseInt(child.age, 10),
//             checkIn: new Date(`1970-01-01T${child.checkIn}:00Z`).toISOString(),
//             checkOut: new Date(`1970-01-01T${child.checkOut}:00Z`).toISOString(),
//             facePhotos 
//           };
//         })
//       )
//     };
    
//     await fetch('/api/database/crud/parents', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formDataWithImages)
//     });
//     fetchParents();
//     setOpen(false);
//   };
  

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Manage Nursery Data
//       </Typography>
//       <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
//         Add New Parent
//       </Button>
//       <TableContainer component={Paper} sx={{ mt: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Gender</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Created At</TableCell>
//               <TableCell>Updated At</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {parents.map((parent) => (
//               <TableRow key={parent.id}>
//                 <TableCell>{parent.id}</TableCell>
//                 <TableCell>{parent.email}</TableCell>
//                 <TableCell>{parent.name}</TableCell>
//                 <TableCell>{parent.phone}</TableCell>
//                 <TableCell>{parent.gender}</TableCell>
//                 <TableCell>{parent.address}</TableCell>
//                 <TableCell>{new Date(parent.createdAt).toLocaleDateString()}</TableCell>
//                 <TableCell>{new Date(parent.updatedAt).toLocaleDateString()}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>Add New Parent</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please fill out the following fields to add a new parent.
//           </DialogContentText>
//           <TextField
//             margin="dense"
//             label="Email"
//             type="email"
//             fullWidth
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Name"
//             fullWidth
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Phone"
//             fullWidth
//             name="phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//           />
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Gender</InputLabel>
//             <Select
//               name="gender"
//               value={formData.gender}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="MALE">Male</MenuItem>
//               <MenuItem value="FEMALE">Female</MenuItem>
//               <MenuItem value="OTHER">Other</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             margin="dense"
//             label="Address"
//             fullWidth
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//           />
//           {formData.children.map((child, index) => (
//             <Box key={index} sx={{ mt: 2, border: '1px solid #ccc', p: 2, borderRadius: '8px' }}>
//               <Typography variant="h6">Child {index + 1}</Typography>
//               <TextField
//                 margin="dense"
//                 label="Name"
//                 fullWidth
//                 name="name"
//                 value={child.name}
//                 onChange={(e) => handleChildInputChange(index, e)}
//               />
//               <FormControl fullWidth margin="dense">
//                 <InputLabel>Gender</InputLabel>
//                 <Select
//                   name="gender"
//                   value={child.gender}
//                   onChange={(e) => handleChildInputChange(index, e)}
//                 >
//                   <MenuItem value="MALE">Male</MenuItem>
//                   <MenuItem value="FEMALE">Female</MenuItem>
//                   <MenuItem value="OTHER">Other</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 margin="dense"
//                 label="Age"
//                 type="number"
//                 fullWidth
//                 name="age"
//                 value={child.age}
//                 onChange={(e) => handleChildInputChange(index, e)}
//               />
//               <TextField
//                 id="time"
//                 label="Check In"
//                 type="time"
//                 fullWidth
//                 name="checkIn"
//                 value={child.checkIn}
//                 onChange={(e) => handleChildInputChange(index, e)}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 inputProps={{
//                   step: 300, // 5 minutes
//                 }}
//                 margin="dense"
//               />
//               <TextField
//                 id="time"
//                 label="Check Out"
//                 type="time"
//                 fullWidth
//                 name="checkOut"
//                 value={child.checkOut}
//                 onChange={(e) => handleChildInputChange(index, e)}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 inputProps={{
//                   step: 300, // 5 minutes
//                 }}
//                 margin="dense"
//               />
//               <Button
//                 variant="contained"
//                 component="label"
//                 fullWidth
//                 sx={{ mt: 2 }}
//               >
//                 Upload Face Photos (max 10)
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   hidden
//                   onChange={(e) => handleFileChange(index, e.target.files)}
//                 />
//               </Button>
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
//                 {child.facePhotos.length > 0 &&
//                   Array.from(child.facePhotos).map((file, i) => (
//                     <Box key={i} sx={{ width: 100, height: 100, p: 1 }}>
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt={`Child ${index + 1} Photo ${i + 1}`}
//                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                       />
//                     </Box>
//                   ))}
//               </Box>
//               <IconButton
//                 onClick={() => handleRemoveChild(index)}
//                 color="secondary"
//                 aria-label="remove child"
//                 sx={{ mt: 2 }}
//               >
//                 <IconTrash />
//               </IconButton>
//             </Box>
//           ))}
//           <Button
//             variant="outlined"
//             color="primary"
//             onClick={handleAddChild}
//             startIcon={<IconPlus />}
//             sx={{ mt: 2 }}
//           >
//             Add Child
//           </Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary">
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CrudPage;


import React from 'react';
import { Container, Typography } from '@mui/material';
import ParentsGrid from '@/components/DataBase/CRUD/ParentsGrid';

const Home = () => {
  return (
    <Container>
      <ParentsGrid />
    </Container>
  );
};

export default Home;
