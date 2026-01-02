// import { DeleteFilled, EditFilled } from '@ant-design/icons';
// import type { PaginationProps, TableColumnsType } from 'antd';
// import { Button, Col, Flex, Modal, Pagination, Row, Table, Tag } from 'antd';
// import { useState } from 'react';
// import { FieldValues, useForm } from 'react-hook-form';
// import {
//   useAddStockMutation,
//   useDeleteProductMutation,
//   useGetAllProductsQuery,
//   useUpdateProductMutation,
// } from '../../redux/features/management/productApi';
// import { ICategory, IProduct } from '../../types/product.types';
// import ProductManagementFilter from '../../components/query-filters/ProductManagementFilter';
// import CustomInput from '../../components/CustomInput';
// import toastMessage from '../../lib/toastMessage';
// import { useGetAllCategoriesQuery } from '../../redux/features/management/categoryApi';
// import { useGetAllSellerQuery } from '../../redux/features/management/sellerApi';
// import { useGetAllBrandsQuery } from '../../redux/features/management/brandApi';
// import { useCreateSaleMutation } from '../../redux/features/management/saleApi';
// import { SpinnerIcon } from '@phosphor-icons/react';

// const ProductManagePage = () => {
//   const [current, setCurrent] = useState(1);
//   const [query, setQuery] = useState({
//     name: '',
//     category: '',
//     brand: '',
//     limit: 10,
//   });

//   const { data: products, isFetching } = useGetAllProductsQuery(query);

//   const onChange: PaginationProps['onChange'] = (page) => {
//     setCurrent(page);
//   };

//   const tableData = products?.data?.map((product: IProduct) => ({
//     key: product._id,
//     name: product.name,
//     category: product.category,
//     categoryName: product.category.name,
//     price: product.price,
//     stock: product.stock,
//     seller: product?.seller,
//     sellerName: product?.seller?.name || 'DELETED SELLER',
//     brand: product.brand,
//     size: product.size,
//     description: product.description,
//   }));

//   const columns: TableColumnsType<any> = [
//     {
//       title: 'Product Name',
//       key: 'name',
//       dataIndex: 'name',
//     },
//     {
//       title: 'Category',
//       key: 'categoryName',
//       dataIndex: 'categoryName',
//       align: 'center',
//     },
//     {
//       title: 'price',
//       key: 'price',
//       dataIndex: 'price',
//       align: 'center',
//     },
//     {
//       title: 'stock',
//       key: 'stock',
//       dataIndex: 'stock',
//       align: 'center',
//     },
//     {
//       title: 'Purchase From',
//       key: 'sellerName',
//       dataIndex: 'sellerName',
//       align: 'center',
//       render: (sellerName: string) => {
//         if (sellerName === 'DELETED SELLER') return <Tag color='red'>{sellerName}</Tag>;
//         return <Tag color='green'>{sellerName}</Tag>;
//       },
//     },
//     {
//       title: 'Action',
//       key: 'x',
//       align: 'center',
//       render: (item) => {
//         return (
//           <div style={{ display: 'flex' }}>
//             <SellProductModal product={item} />
//             <AddStockModal product={item} />
//             <UpdateProductModal product={item} />
//             <DeleteProductModal id={item.key} />
//           </div>
//         );
//       },
//       width: '1%',
//     },
//   ];

//   return (
//     <>
//       <ProductManagementFilter query={query} setQuery={setQuery} />
//       <Table
//         size='small'
//         loading={isFetching}
//         columns={columns}
//         dataSource={tableData}
//         pagination={false}
//       />
//       <Flex justify='center' style={{ marginTop: '1rem' }}>
//         <Pagination
//           current={current}
//           onChange={onChange}
//           defaultPageSize={query.limit}
//           total={products?.meta?.total}
//         />
//       </Flex>
//     </>
//   );
// };

// /**
//  * Sell Product Modal
//  */
// const SellProductModal = ({ product }: { product: IProduct & { key: string } }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const {
//     handleSubmit,
//     register,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [saleProduct, { isLoading }] = useCreateSaleMutation();

//   const onSubmit = async (data: FieldValues) => {
//     const payload = {
//       product: product.key,
//       productName: product.name,
//       productPrice: product.price,
//       quantity: Number(data.quantity),
//       buyerName: data.buyerName,
//       date: data.date,
//     };
//     try {
//       const res = await saleProduct(payload).unwrap();
//       if (res.statusCode === 201) {
//         toastMessage({ icon: 'success', text: res.message });
//         reset();
//         handleCancel();
//       }
//     } catch (error: any) {
//       handleCancel();
//       toastMessage({ icon: 'error', text: error.data.message });
//     }
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Button
//         onClick={showModal}
//         type='primary'
//         className='table-btn'
//         style={{ backgroundColor: 'royalblue' }}
//       >
//         Use
//       </Button>
//       <Modal title='Sell Product' open={isModalOpen} onCancel={handleCancel} footer={null}>
//         <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '1rem' }}>
//           <CustomInput
//             name='buyerName'
//             label='User Name'
//             errors={errors}
//             required={true}
//             register={register}
//             type='text'
//           />
//           <CustomInput
//             name='date'
//             label='Used date'
//             errors={errors}
//             required={true}
//             register={register}
//             type='date'
//           />
//           <CustomInput
//             name='quantity'
//             label='Quantity'
//             errors={errors}
//             required={true}
//             register={register}
//             type='number'
//           />
//           <Flex justify='center' style={{ marginTop: '1rem' }}>
//             <Button htmlType='submit' type='primary' disabled={isLoading}>
//               {isLoading && <SpinnerIcon className='spin' weight='bold' />}
//               Sell Product
//             </Button>
//           </Flex>
//         </form>
//       </Modal>
//     </>
//   );
// };

// /**
//  * Add Stock Modal
//  */
// const AddStockModal = ({ product }: { product: IProduct & { key: string } }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { handleSubmit, register, reset } = useForm();
//   const [addToStock, { isLoading }] = useAddStockMutation();

//   const onSubmit = async (data: FieldValues) => {
//     const payload = {
//       stock: Number(data.stock),
//       seller: product.seller,
//     };

//     try {
//       const res = await addToStock({ id: product.key, payload }).unwrap();
//       if (res.statusCode === 200) {
//         toastMessage({ icon: 'success', text: res.message });
//         reset();
//         handleCancel();
//       }
//     } catch (error: any) {
//       handleCancel();
//       toastMessage({ icon: 'error', text: error.data.message });
//     }
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Button
//         onClick={showModal}
//         type='primary'
//         className='table-btn'
//         style={{ backgroundColor: 'blue' }}
//       >
//         Add Stock
//       </Button>
//       <Modal title='Add Product to Stock' open={isModalOpen} onCancel={handleCancel} footer={null}>
//         <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '2rem' }}>
//           <CustomInput name='stock' label='Add Stock' register={register} type='number' />
//           <Flex justify='center' style={{ marginTop: '1rem' }}>
//             <Button htmlType='submit' type='primary' disabled={isLoading}>
//               {isLoading && <SpinnerIcon className='spin' weight='bold' />}
//               Submit
//             </Button>
//           </Flex>
//         </form>
//       </Modal>
//     </>
//   );
// };

// /**
//  * Update Product Modal
//  */
// const UpdateProductModal = ({ product }: { product: IProduct & { key: string } }) => {
//   const [updateProduct] = useUpdateProductMutation();
//   const { data: categories } = useGetAllCategoriesQuery(undefined);
//   const { data: sellers, isLoading: isSellerLoading } = useGetAllSellerQuery(undefined);
//   const { data: brands } = useGetAllBrandsQuery(undefined);

//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       name: product.name,
//       price: product.price,
//       seller: product?.seller?._id,
//       category: product.category._id,
//       brand: product.brand?._id,
//       description: product.description,
//       size: product.size,
//     },
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const onSubmit = async (data: FieldValues) => {
//     try {
//       const res = await updateProduct({ id: product.key, payload: data }).unwrap();
//       if (res.statusCode === 200) {
//         toastMessage({ icon: 'success', text: res.message });
//         reset();
//         handleCancel();
//       }
//     } catch (error: any) {
//       handleCancel();
//       toastMessage({ icon: 'error', text: error.data.message });
//     }
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Button
//         onClick={showModal}
//         type='primary'
//         className='table-btn-small'
//         style={{ backgroundColor: 'green' }}
//       >
//         <EditFilled />
//       </Button>
//       <Modal title='Update Product Info' open={isModalOpen} onCancel={handleCancel} footer={null}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <CustomInput
//             name='name'
//             errors={errors}
//             label='Name'
//             register={register}
//             required={true}
//           />
//           <CustomInput
//             errors={errors}
//             label='Price'
//             type='number'
//             name='price'
//             register={register}
//             required={true}
//           />
//           <Row>
//             <Col xs={{ span: 23 }} lg={{ span: 6 }}>
//               <label htmlFor='Size' className='label'>
//                 Seller
//               </label>
//             </Col>
//             <Col xs={{ span: 23 }} lg={{ span: 18 }}>
//               <select
//                 disabled={isSellerLoading}
//                 {...register('seller', { required: true })}
//                 className={`input-field ${errors['seller'] ? 'input-field-error' : ''}`}
//               >
//                 <option value=''>Select Seller*</option>
//                 {sellers?.data.map((item: ICategory) => (
//                   <option value={item._id} key={item._id}>
//                     {item.name}
//                   </option>
//                 ))}
//               </select>
//             </Col>
//           </Row>

//           <Row>
//             <Col xs={{ span: 23 }} lg={{ span: 6 }}>
//               <label htmlFor='Size' className='label'>
//                 Category
//               </label>
//             </Col>
//             <Col xs={{ span: 23 }} lg={{ span: 18 }}>
//               <select
//                 {...register('category', { required: true })}
//                 className={`input-field ${errors['category'] ? 'input-field-error' : ''}`}
//               >
//                 <option value=''>Select Category*</option>
//                 {categories?.data.map((item: ICategory) => (
//                   <option value={item._id} key={item._id}>
//                     {item.name}
//                   </option>
//                 ))}
//               </select>
//             </Col>
//           </Row>

//           <Row>
//             <Col xs={{ span: 23 }} lg={{ span: 6 }}>
//               <label htmlFor='Size' className='label'>
//                 Brand
//               </label>
//             </Col>
//             <Col xs={{ span: 23 }} lg={{ span: 18 }}>
//               <select
//                 {...register('brand')}
//                 className={`input-field ${errors['brand'] ? 'input-field-error' : ''}`}
//               >
//                 <option value=''>Select brand</option>
//                 {brands?.data.map((item: ICategory) => (
//                   <option value={item._id} key={item._id}>
//                     {item.name}
//                   </option>
//                 ))}
//               </select>
//             </Col>
//           </Row>

//           <CustomInput label='Description' name='description' register={register} />

//           <Row>
//             <Col xs={{ span: 23 }} lg={{ span: 6 }}>
//               <label htmlFor='Size' className='label'>
//                 Size
//               </label>
//             </Col>
//             <Col xs={{ span: 23 }} lg={{ span: 18 }}>
//               <select className={`input-field`} {...register('size')}>
//                 <option value=''>Select Product Size</option>
//                 <option value='SMALL'>Small</option>
//                 <option value='MEDIUM'>Medium</option>
//                 <option value='LARGE'>Large</option>
//               </select>
//             </Col>
//           </Row>
//           <Flex justify='center'>
//             <Button
//               htmlType='submit'
//               type='primary'
//               style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
//             >
//               Update
//             </Button>
//           </Flex>
//         </form>
//       </Modal>
//     </>
//   );
// };

// /**
//  * Delete Product Modal
//  */
// const DeleteProductModal = ({ id }: { id: string }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteProduct] = useDeleteProductMutation();

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await deleteProduct(id).unwrap();
//       if (res.statusCode === 200) {
//         toastMessage({ icon: 'success', text: res.message });
//         handleCancel();
//       }
//     } catch (error: any) {
//       handleCancel();
//       toastMessage({ icon: 'error', text: error.data.message });
//     }
//   };

//   return (
//     <>
//       <Button
//         onClick={showModal}
//         type='primary'
//         className='table-btn-small'
//         style={{ backgroundColor: 'red' }}
//       >
//         <DeleteFilled />
//       </Button>
//       <Modal title='Delete Product' open={isModalOpen} onCancel={handleCancel} footer={null}>
//         <div style={{ textAlign: 'center', padding: '2rem' }}>
//           <h2>Are you want to delete this product?</h2>
//           <h4>You won't be able to revert it.</h4>
//           <div
//             style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}
//           >
//             <Button
//               onClick={handleCancel}
//               type='primary'
//               style={{ backgroundColor: 'lightseagreen' }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => handleDelete(id)}
//               type='primary'
//               style={{ backgroundColor: 'red' }}
//             >
//               Yes! Delete
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default ProductManagePage;





// import { DeleteFilled, EditFilled } from '@ant-design/icons';
// import type { PaginationProps, TableColumnsType } from 'antd';
// import { Button, Col, Flex, Modal, Pagination, Row, Table, Tag } from 'antd';
// import { useState } from 'react';
// import { FieldValues, useForm } from 'react-hook-form';
// import {
//   useAddStockMutation,
//   useDeleteProductMutation,
//   useGetAllProductsQuery,
//   useUpdateProductMutation,
// } from '../../redux/features/management/productApi';
// import { ICategory, IProduct } from '../../types/product.types';
// import ProductManagementFilter from '../../components/query-filters/ProductManagementFilter';
// import CustomInput from '../../components/CustomInput';
// import toastMessage from '../../lib/toastMessage';
// import { useGetAllCategoriesQuery } from '../../redux/features/management/categoryApi';
// import { useGetAllSellerQuery } from '../../redux/features/management/sellerApi';
// import { useGetAllBrandsQuery } from '../../redux/features/management/brandApi';
// import { useCreateSaleMutation } from '../../redux/features/management/saleApi';
// import { SpinnerIcon } from '@phosphor-icons/react';

// // ✅ Excel imports
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// const ProductManagePage = () => {
//   const [current, setCurrent] = useState(1);
//   const [query, setQuery] = useState({
//     name: '',
//     category: '',
//     brand: '',
//     limit: 10,
//   });

//   const { data: products, isFetching } = useGetAllProductsQuery(query);

//   const onChange: PaginationProps['onChange'] = (page) => {
//     setCurrent(page);
//   };

//   const tableData = products?.data?.map((product: IProduct) => ({
//     key: product._id,
//     name: product.name,
//     category: product.category,
//     categoryName: product.category.name,
//     price: product.price,
//     stock: product.stock,
//     seller: product?.seller,
//     sellerName: product?.seller?.name || 'DELETED SELLER',
//     brand: product.brand,
//     size: product.size,
//     description: product.description,
//   }));

//   // ✅ EXCEL DOWNLOAD FUNCTION
//   const handleDownloadExcel = () => {
//     if (!products?.data?.length) return;

//     const excelData = products.data.map((product: IProduct) => ({
//       'Product Name': product.name,
//       Category: product.category?.name,
//       Brand: product.brand?.name ?? '',
//       Price: product.price,
//       Stock: product.stock,
//       Seller: product.seller?.name ?? 'DELETED SELLER',
//       Size: product.size,
//       Description: product.description,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: 'xlsx',
//       type: 'array',
//     });

//     const blob = new Blob([excelBuffer], {
//       type:
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
//     });

//     saveAs(blob, 'Product_List.xlsx');
//   };

//   const columns: TableColumnsType<any> = [
//     { title: 'Product Name', dataIndex: 'name' },
//     { title: 'Category', dataIndex: 'categoryName', align: 'center' },
//     { title: 'Price', dataIndex: 'price', align: 'center' },
//     { title: 'Stock', dataIndex: 'stock', align: 'center' },
//     {
//       title: 'Purchase From',
//       dataIndex: 'sellerName',
//       align: 'center',
//       render: (sellerName: string) =>
//         sellerName === 'DELETED SELLER' ? (
//           <Tag color="red">{sellerName}</Tag>
//         ) : (
//           <Tag color="green">{sellerName}</Tag>
//         ),
//     },
//     {
//       title: 'Action',
//       align: 'center',
//       render: (item) => (
//         <div style={{ display: 'flex', gap: '4px' }}>
//           <SellProductModal product={item} />
//           <AddStockModal product={item} />
//           <UpdateProductModal product={item} />
//           <DeleteProductModal id={item.key} />
//         </div>
//       ),
//       width: '1%',
//     },
//   ];

//   return (
//     <>
//       <ProductManagementFilter query={query} setQuery={setQuery} />

//       {/* ✅ DOWNLOAD BUTTON */}
//       <Flex justify="space-between" style={{ marginBottom: '1rem' }}>
//         <h3>Product Management</h3>
//         <Button type="primary" onClick={handleDownloadExcel}>
//           Download Excel
//         </Button>
//       </Flex>

//       <Table
//         size="small"
//         loading={isFetching}
//         columns={columns}
//         dataSource={tableData}
//         pagination={false}
//       />

//       <Flex justify="center" style={{ marginTop: '1rem' }}>
//         <Pagination
//           current={current}
//           onChange={onChange}
//           defaultPageSize={query.limit}
//           total={products?.meta?.total}
//         />
//       </Flex>
//     </>
//   );
// };

// /* ---------------- SELL PRODUCT MODAL ---------------- */

// const SellProductModal = ({ product }: { product: IProduct & { key: string } }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { handleSubmit, register, reset, formState: { errors } } = useForm();
//   const [saleProduct, { isLoading }] = useCreateSaleMutation();

//   const onSubmit = async (data: FieldValues) => {
//     try {
//       const res = await saleProduct({
//         product: product.key,
//         productName: product.name,
//         productPrice: product.price,
//         quantity: Number(data.quantity),
//         buyerName: data.buyerName,
//         date: data.date,
//       }).unwrap();

//       toastMessage({ icon: 'success', text: res.message });
//       reset();
//       setIsModalOpen(false);
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data.message });
//     }
//   };

//   return (
//     <>
//       <Button type="primary" onClick={() => setIsModalOpen(true)}>
//         Use
//       </Button>
//       <Modal title="Sell Product" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <CustomInput name="buyerName" label="User Name" register={register} errors={errors} required />
//           <CustomInput name="date" label="Used Date" register={register} type="date" required />
//           <CustomInput name="quantity" label="Quantity" register={register} type="number" required />
//           <Flex justify="center">
//             <Button htmlType="submit" type="primary" disabled={isLoading}>
//               {isLoading && <SpinnerIcon className="spin" />}
//               Sell Product
//             </Button>
//           </Flex>
//         </form>
//       </Modal>
//     </>
//   );
// };

// /* ---------------- ADD STOCK MODAL ---------------- */

// const AddStockModal = ({ product }: { product: IProduct & { key: string } }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { handleSubmit, register, reset } = useForm();
//   const [addToStock, { isLoading }] = useAddStockMutation();

//   const onSubmit = async (data: FieldValues) => {
//     try {
//       const res = await addToStock({
//         id: product.key,
//         payload: { stock: Number(data.stock), seller: product.seller },
//       }).unwrap();

//       toastMessage({ icon: 'success', text: res.message });
//       reset();
//       setIsModalOpen(false);
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data.message });
//     }
//   };

//   return (
//     <>
//       <Button type="primary" onClick={() => setIsModalOpen(true)}>
//         Add Stock
//       </Button>
//       <Modal title="Add Stock" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <CustomInput name="stock" label="Stock" register={register} type="number" />
//           <Flex justify="center">
//             <Button htmlType="submit" type="primary" disabled={isLoading}>
//               Submit
//             </Button>
//           </Flex>
//         </form>
//       </Modal>
//     </>
//   );
// };

// /* ---------------- UPDATE & DELETE MODALS ---------------- */

// const UpdateProductModal = () => null;
// const DeleteProductModal = () => null;

// export default ProductManagePage;





// import { DeleteFilled, EditFilled } from '@ant-design/icons';
// import type { PaginationProps, TableColumnsType } from 'antd';
// import { Button, Flex, Modal, Pagination, Table, Tag } from 'antd';
// import { useState } from 'react';
// import { FieldValues, useForm } from 'react-hook-form';
// import {
//   useAddStockMutation,
//   useGetAllProductsQuery,
// } from '../../redux/features/management/productApi';
// import { IProduct } from '../../types/product.types';
// import ProductManagementFilter from '../../components/query-filters/ProductManagementFilter';
// import CustomInput from '../../components/CustomInput';
// import toastMessage from '../../lib/toastMessage';
// import { useCreateSaleMutation } from '../../redux/features/management/saleApi';
// import { SpinnerIcon } from '@phosphor-icons/react';

// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// /* ================= PRODUCT MANAGEMENT PAGE ================= */

// const ProductManagePage = () => {
//   const [current, setCurrent] = useState(1);
//   const [query, setQuery] = useState({
//     name: '',
//     category: '',
//     brand: '',
//     limit: 10,
//   });

//   const { data: products, isFetching } = useGetAllProductsQuery(query);

//   const onChange: PaginationProps['onChange'] = (page) => {
//     setCurrent(page);
//   };

//   const tableData = products?.data?.map((product: IProduct) => ({
//     key: product._id,
//     name: product.name,
//     categoryName: product.category?.name,
//     price: product.price,
//     stock: product.stock,
//     sellerName: product?.seller?.name || 'DELETED SELLER',
//     seller: product?.seller,
//     description: product.description,
//   }));

//   /* ================= EXCEL DOWNLOAD ================= */

//   const handleDownloadExcel = () => {
//     if (!products?.data?.length) return;

//     const excelData = products.data.map((product: IProduct) => ({
//       'Product Name': product.name,
//       Category: product.category?.name,
//       Price: product.price,
//       Stock: product.stock,
//       Seller: product.seller?.name ?? 'DELETED SELLER',
//       Description: product.description,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: 'xlsx',
//       type: 'array',
//     });

//     const blob = new Blob([excelBuffer], {
//       type:
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
//     });

//     saveAs(blob, 'Product_List.xlsx');
//   };

//   /* ================= TABLE COLUMNS ================= */

//   const columns: TableColumnsType<any> = [
//     { title: 'Product Name', dataIndex: 'name' },
//     { title: 'Category', dataIndex: 'categoryName', align: 'center' },
//     { title: 'Price', dataIndex: 'price', align: 'center' },
//     { title: 'Stock', dataIndex: 'stock', align: 'center' },
//     {
//       title: 'Purchase From',
//       dataIndex: 'sellerName',
//       align: 'center',
//       render: (sellerName: string) =>
//         sellerName === 'DELETED SELLER' ? (
//           <Tag color="red">{sellerName}</Tag>
//         ) : (
//           <Tag color="green">{sellerName}</Tag>
//         ),
//     },
//     {
//       title: 'Action',
//       align: 'center',
//       render: (item) => (
//         <Flex gap={4}>
//           <SellProductModal product={item} />
//           <AddStockModal product={item} />
//         </Flex>
//       ),
//     },
//   ];

//   return (
//     <>
//       <ProductManagementFilter query={query} setQuery={setQuery} />

//       <Flex justify="space-between" style={{ marginBottom: '1rem' }}>
//         <h3>Product Management</h3>
//         <Button type="primary" onClick={handleDownloadExcel}>
//           Download Excel
//         </Button>
//       </Flex>

//       <Table
//         size="small"
//         loading={isFetching}
//         columns={columns}
//         dataSource={tableData}
//         pagination={false}
//       />

//       <Flex justify="center" style={{ marginTop: '1rem' }}>
//         <Pagination
//           current={current}
//           onChange={onChange}
//           defaultPageSize={query.limit}
//           total={products?.meta?.total}
//         />
//       </Flex>
//     </>
//   );
// };

// /* ================= SELL PRODUCT MODAL ================= */

// const SellProductModal = ({ product }: { product: any }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const {
//     handleSubmit,
//     register,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [saleProduct, { isLoading }] = useCreateSaleMutation();

//   const onSubmit = async (data: FieldValues) => {
//     try {
//       const res = await saleProduct({
//         product: product.key,
//         productName: product.name,
//         productPrice: product.price,
//         quantity: Number(data.quantity),
//         buyerName: data.buyerName,
//         customerDetails: data.customerDetails, // ✅ NEW FIELD
//         date: data.date,
//       }).unwrap();

//       toastMessage({ icon: 'success', text: res.message });
//       reset();
//       setIsModalOpen(false);
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data.message });
//     }
//   };

//   return (
//     <>
//       <Button type="primary" onClick={() => setIsModalOpen(true)}>
//         Use
//       </Button>

//       <Modal
//         title="USING PRODUCTS"
//         open={isModalOpen}
//         footer={null}
//         onCancel={() => setIsModalOpen(false)}
//       >
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <CustomInput
//             name="buyerName"
//             label="User Name"
//             register={register}
//             errors={errors}
//             required
//           />

//           <CustomInput
//             name="date"
//             label="Used Date"
//             type="date"
//             register={register}
//             required
//           />

//           <CustomInput
//             name="quantity"
//             label="Quantity"
//             type="number"
//             register={register}
//             errors={errors}
//             required
//           />

//           {/* ✅ CUSTOMER DETAILS */}
//           <CustomInput
//             name="customerDetails"
//             label="Customer Details"
//             register={register}
//             errors={errors}
//             placeholder="Phone / Address / Remarks"
//             required
//           />

//           <Flex justify="center" style={{ marginTop: 16 }}>
//             <Button htmlType="submit" type="primary" disabled={isLoading}>
//               {isLoading && <SpinnerIcon className="spin" />}
//               Using Products
//             </Button>
//           </Flex>
//         </form>
//       </Modal>
//     </>
//   );
// };

// /* ================= ADD STOCK MODAL ================= */

// const AddStockModal = ({ product }: { product: any }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { handleSubmit, register, reset } = useForm();
//   const [addToStock, { isLoading }] = useAddStockMutation();

//   const onSubmit = async (data: FieldValues) => {
//     try {
//       const res = await addToStock({
//         id: product.key,
//         payload: {
//           stock: Number(data.stock),
//           seller: product.seller,
//         },
//       }).unwrap();

//       toastMessage({ icon: 'success', text: res.message });
//       reset();
//       setIsModalOpen(false);
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data.message });
//     }
//   };

//   return (
//     <>
//       <Button onClick={() => setIsModalOpen(true)}>Add Stock</Button>

//       <Modal
//         title="Add Stock"
//         open={isModalOpen}
//         footer={null}
//         onCancel={() => setIsModalOpen(false)}
//       >
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <CustomInput
//             name="stock"
//             label="Stock"
//             type="number"
//             register={register}
//             required
//           />

//           <Flex justify="center">
//             <Button htmlType="submit" type="primary" disabled={isLoading}>
//               Submit
//             </Button>
//           </Flex>
//         </form>
//       </Modal>
//     </>
//   );
// };

// export default ProductManagePage;



import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Flex, Modal, Pagination, Table, Tag } from 'antd';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  useAddStockMutation,
  useGetAllProductsQuery,
} from '../../redux/features/management/productApi';
import { IProduct } from '../../types/product.types';
import ProductManagementFilter from '../../components/query-filters/ProductManagementFilter';
import CustomInput from '../../components/CustomInput';
import toastMessage from '../../lib/toastMessage';
import { useCreateSaleMutation } from '../../redux/features/management/saleApi';
import { SpinnerIcon } from '@phosphor-icons/react';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/* ================= PRODUCT MANAGEMENT PAGE ================= */

const ProductManagePage = () => {
  const [current, setCurrent] = useState(1);
  const [query, setQuery] = useState({
    name: '',
    category: '',
    brand: '',
    limit: 10,
  });

  const { data: products, isFetching } = useGetAllProductsQuery(query);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  const tableData = products?.data?.map((product: IProduct) => ({
    key: product._id,
    name: product.name,
    categoryName: product.category?.name,
    price: product.price,
    stock: product.stock,
    sellerName: product?.seller?.name || 'DELETED SELLER',
    seller: product?.seller,
    description: product.description,
  }));

  /* ================= EXCEL DOWNLOAD ================= */

  const handleDownloadExcel = () => {
    if (!products?.data?.length) return;

    const excelData = products.data.map((product: IProduct) => ({
      'Product Name': product.name,
      Category: product.category?.name,
      Price: product.price,
      Stock: product.stock,
      Seller: product.seller?.name ?? 'DELETED SELLER',
      Description: product.description,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(blob, 'Product_List.xlsx');
  };

  /* ================= TABLE COLUMNS ================= */

  const columns: TableColumnsType<any> = [
    { title: 'Product Name', dataIndex: 'name' },
    { title: 'Category', dataIndex: 'categoryName', align: 'center' },
    { title: 'Price', dataIndex: 'price', align: 'center' },
    { title: 'Stock', dataIndex: 'stock', align: 'center' },
    {
      title: 'Purchase From',
      dataIndex: 'sellerName',
      align: 'center',
      render: (sellerName: string) =>
        sellerName === 'DELETED SELLER' ? (
          <Tag color="red">{sellerName}</Tag>
        ) : (
          <Tag color="green">{sellerName}</Tag>
        ),
    },
    {
      title: 'Action',
      align: 'center',
      render: (item) => (
        <Flex gap={4}>
          <SellProductModal product={item} />
          <AddStockModal product={item} />
        </Flex>
      ),
    },
  ];

  return (
    <>
      <ProductManagementFilter query={query} setQuery={setQuery} />

      <Flex justify="space-between" style={{ marginBottom: '1rem' }}>
        <h3>Product Management</h3>
        <Button type="primary" onClick={handleDownloadExcel}>
          Download Excel
        </Button>
      </Flex>

      <Table
        size="small"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />

      <Flex justify="center" style={{ marginTop: '1rem' }}>
        <Pagination
          current={current}
          onChange={onChange}
          defaultPageSize={query.limit}
          total={products?.meta?.total}
        />
      </Flex>
    </>
  );
};

/* ================= SELL PRODUCT MODAL ================= */

const SellProductModal = ({ product }: { product: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [saleProduct, { isLoading }] = useCreateSaleMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await saleProduct({
        product: product.key,
        productName: product.name,
        productPrice: product.price,
        quantity: Number(data.quantity),
        buyerName: data.buyerName,
        customerDetails: data.customerDetails, // ✅ NEW FIELD
        date: data.date,
      }).unwrap();

      toastMessage({ icon: 'success', text: res.message });
      reset();
      setIsModalOpen(false);
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Use
      </Button>

      <Modal
        title="USING PRODUCTS"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            name="buyerName"
            label="User Name"
            register={register}
            errors={errors}
            required
          />

          <CustomInput
            name="date"
            label="Used Date"
            type="date"
            register={register}
            required
          />

          <CustomInput
            name="quantity"
            label="Quantity"
            type="number"
            register={register}
            errors={errors}
            required
          />

          {/* ✅ CUSTOMER DETAILS: removed unsupported `placeholder` prop to satisfy Props */}
          <CustomInput
            name="customerDetails"
            label="Customer Details"
            register={register}
            errors={errors}
            required
          />

          <Flex justify="center" style={{ marginTop: 16 }}>
            <Button htmlType="submit" type="primary" disabled={isLoading}>
              {isLoading && <SpinnerIcon className="spin" />}
              Using Products
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

/* ================= ADD STOCK MODAL ================= */

const AddStockModal = ({ product }: { product: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const [addToStock, { isLoading }] = useAddStockMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await addToStock({
        id: product.key,
        payload: {
          stock: Number(data.stock),
          seller: product.seller,
        },
      }).unwrap();

      toastMessage({ icon: 'success', text: res.message });
      reset();
      setIsModalOpen(false);
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add Stock</Button>

      <Modal
        title="Add Stock"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            name="stock"
            label="Stock"
            type="number"
            register={register}
            required
          />

          <Flex justify="center">
            <Button htmlType="submit" type="primary" disabled={isLoading}>
              Submit
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default ProductManagePage;