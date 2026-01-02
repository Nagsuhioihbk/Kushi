// import { DeleteFilled, EditFilled } from '@ant-design/icons';
// import type { PaginationProps, TableColumnsType } from 'antd';
// import { Button, Flex, Modal, Pagination, Table } from 'antd';
// import { useState } from 'react';
// import { FieldValues, useForm } from 'react-hook-form';
// import SearchInput from '../../components/SearchInput';
// import toastMessage from '../../lib/toastMessage';
// import { useDeleteSaleMutation, useGetAllSaleQuery } from '../../redux/features/management/saleApi';
// import { IProduct } from '../../types/product.types';
// import { ITableSale } from '../../types/sale.type';
// import formatDate from '../../utils/formatDate';

// const SaleManagementPage = () => {
//   const [query, setQuery] = useState({
//     page: 1,
//     limit: 10,
//     search: '',
//   });

//   const { data, isFetching } = useGetAllSaleQuery(query);

//   const onChange: PaginationProps['onChange'] = (page) => {
//     setQuery((prev) => ({ ...prev, page: page }));
//   };

//   const tableData = data?.data?.map((sale: ITableSale) => ({
//     key: sale._id,
//     productName: sale.productName,
//     productPrice: sale.productPrice,
//     buyerName: sale.buyerName,
//     quantity: sale.quantity,
//     totalPrice: sale.totalPrice,
//     date: formatDate(sale.date),
//   }));

//   const columns: TableColumnsType<any> = [
//     {
//       title: 'Product Name',
//       key: 'productName',
//       dataIndex: 'productName',
//     },
//     {
//       title: 'Product Price',
//       key: 'productPrice',
//       dataIndex: 'productPrice',
//       align: 'center',
//     },
//     {
//       title: 'Buyer Name',
//       key: 'buyerName',
//       dataIndex: 'buyerName',
//       align: 'center',
//     },
//     {
//       title: 'Quantity',
//       key: 'quantity',
//       dataIndex: 'quantity',
//       align: 'center',
//     },
//     {
//       title: 'Total Price',
//       key: 'totalPrice',
//       dataIndex: 'totalPrice',
//       align: 'center',
//     },
//     {
//       title: 'Selling Date',
//       key: 'date',
//       dataIndex: 'date',
//       align: 'center',
//     },
//     {
//       title: 'Action',
//       key: 'x',
//       align: 'center',
//       render: (item) => {
//         return (
//           <div style={{ display: 'flex' }}>
//             <UpdateModal product={item} />
//             <DeleteModal id={item.key} />
//           </div>
//         );
//       },
//       width: '1%',
//     },
//   ];

//   // const onDateChange: DatePickerProps['onChange'] = (_date, dateString) => {
//   //   setDate(dateString as string);
//   // };

//   return (
//     <>
//       <Flex justify='end' style={{ margin: '5px', gap: 4 }}>
//         {/* <DatePicker
//           onChange={onDateChange}
//           placeholder='Search by Selling date...'
//           style={{ minWidth: '250px' }}
//         /> */}
//         <SearchInput setQuery={setQuery} placeholder='Search Sold Products...' />
//       </Flex>
//       <Table
//         size='small'
//         loading={isFetching}
//         columns={columns}
//         dataSource={tableData}
//         pagination={false}
//       />
//       <Flex justify='center' style={{ marginTop: '1rem' }}>
//         <Pagination
//           current={query.page}
//           onChange={onChange}
//           defaultPageSize={query.limit}
//           total={data?.meta?.total}
//         />
//       </Flex>
//     </>
//   );
// };

// /**
//  * Update Modal
//  */
// const UpdateModal = ({ product }: { product: IProduct }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { handleSubmit } = useForm();

//   const onSubmit = (data: FieldValues) => {
//     console.log({ product, data });
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   // ! Remove the first return to work on this component
//   return;

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
//           <h1>Working on it...!!!</h1>
//           <Button htmlType='submit'>Submit</Button>
//         </form>
//       </Modal>
//     </>
//   );
// };

// /**
//  * Delete Modal
//  */
// const DeleteModal = ({ id }: { id: string }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteSale] = useDeleteSaleMutation();

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await deleteSale(id).unwrap();
//       if (res.statusCode === 200) {
//         toastMessage({ icon: 'success', text: res.message });
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

// export default SaleManagementPage;




// import { DeleteFilled } from '@ant-design/icons';
// import type { PaginationProps, TableColumnsType } from 'antd';
// import { Button, Flex, Modal, Pagination, Table } from 'antd';
// import { useState } from 'react';
// import SearchInput from '../../components/SearchInput';
// import toastMessage from '../../lib/toastMessage';
// import {
//   useDeleteSaleMutation,
//   useGetAllSaleQuery,
// } from '../../redux/features/management/saleApi';
// import { ITableSale } from '../../types/sale.type';
// import formatDate from '../../utils/formatDate';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// /**
//  * Table Row Type
//  */
// interface SaleTableRow {
//   key: string;
//   productName: string;
//   productPrice: number;
//   buyerName: string;
//   quantity: number;
//   totalPrice: number;
//   date: string;
// }

// const SaleManagementPage = () => {
//   const [query, setQuery] = useState({
//     page: 1,
//     limit: 10,
//     search: '',
//   });

//   const { data, isFetching } = useGetAllSaleQuery(query);

//   const onChange: PaginationProps['onChange'] = (page) => {
//     setQuery((prev) => ({ ...prev, page }));
//   };

//   const tableData: SaleTableRow[] =
//     data?.data?.map((sale: ITableSale) => ({
//       key: sale._id,
//       productName: sale.productName,
//       productPrice: sale.productPrice,
//       buyerName: sale.buyerName,
//       quantity: sale.quantity,
//       totalPrice: sale.totalPrice,
//       date: formatDate(sale.date),
//     })) || [];

//   /**
//    * Excel Download
//    */
//   const handleDownloadExcel = () => {
//     if (!data?.data?.length) return;

//     const excelData = data.data.map((sale: ITableSale, index: number) => ({
//       'S.No': index + 1,
//       'Product Name': sale.productName,
//       'Product Price': sale.productPrice,
//       'Buyer Name': sale.buyerName,
//       Quantity: sale.quantity,
//       'Total Price': sale.totalPrice,
//       'Selling Date': formatDate(sale.date),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: 'xlsx',
//       type: 'array',
//     });

//     const blob = new Blob([excelBuffer], {
//       type:
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
//     });

//     saveAs(blob, `sales-report-${Date.now()}.xlsx`);
//   };

//   const columns: TableColumnsType<SaleTableRow> = [
//     {
//       title: 'Product Name',
//       dataIndex: 'productName',
//     },
//     {
//       title: 'Product Price',
//       dataIndex: 'productPrice',
//       align: 'center',
//     },
//     {
//       title: 'Buyer Name',
//       dataIndex: 'buyerName',
//       align: 'center',
//     },
//     {
//       title: 'Quantity',
//       dataIndex: 'quantity',
//       align: 'center',
//     },
//     {
//       title: 'Total Price',
//       dataIndex: 'totalPrice',
//       align: 'center',
//     },
//     {
//       title: 'Selling Date',
//       dataIndex: 'date',
//       align: 'center',
//     },
//     {
//       title: 'Action',
//       align: 'center',
//       render: (_, record) => (
//         <DeleteModal id={record.key} />
//       ),
//       width: '1%',
//     },
//   ];

//   return (
//     <>
//       <Flex justify="end" style={{ margin: '5px', gap: 8 }}>
//         <SearchInput setQuery={setQuery} placeholder="Search Sold Products..." />
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
//           current={query.page}
//           onChange={onChange}
//           defaultPageSize={query.limit}
//           total={data?.meta?.total}
//         />
//       </Flex>
//     </>
//   );
// };

// /**
//  * Delete Modal
//  */
// const DeleteModal = ({ id }: { id: string }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteSale] = useDeleteSaleMutation();

//   const handleDelete = async () => {
//     try {
//       const res = await deleteSale(id).unwrap();
//       if (res.statusCode === 200) {
//         toastMessage({ icon: 'success', text: res.message });
//         setIsModalOpen(false);
//       }
//     } catch (error: any) {
//       setIsModalOpen(false);
//       toastMessage({ icon: 'error', text: error.data?.message });
//     }
//   };

//   return (
//     <>
//       <Button
//         onClick={() => setIsModalOpen(true)}
//         type="primary"
//         className="table-btn-small"
//         style={{ backgroundColor: 'red' }}
//       >
//         <DeleteFilled />
//       </Button>

//       <Modal
//         title="Delete Sale"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <div style={{ textAlign: 'center', padding: '2rem' }}>
//           <h3>Are you sure you want to delete this sale?</h3>
//           <p>You won't be able to revert it.</p>

//           <Flex justify="center" gap={12} style={{ marginTop: '1rem' }}>
//             <Button onClick={() => setIsModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button danger type="primary" onClick={handleDelete}>
//               Yes, Delete
//             </Button>
//           </Flex>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default SaleManagementPage;




// import { DeleteFilled } from '@ant-design/icons';
// import type { PaginationProps, TableColumnsType } from 'antd';
// import { Button, DatePicker, Flex, Modal, Pagination, Table } from 'antd';
// import { useState } from 'react';
// import SearchInput from '../../components/SearchInput';
// import toastMessage from '../../lib/toastMessage';
// import {
//   useDeleteSaleMutation,
//   useGetAllSaleQuery,
// } from '../../redux/features/management/saleApi';
// import { ITableSale } from '../../types/sale.type';
// import formatDate from '../../utils/formatDate';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import dayjs from 'dayjs';

// const { RangePicker } = DatePicker;

// /**
//  * Table Row Type
//  */
// interface SaleTableRow {
//   key: string;
//   productName: string;
//   productPrice: number;
//   buyerName: string;
//   quantity: number;
//   totalPrice: number;
//   date: string;
// }

// const SaleManagementPage = () => {
//   const [query, setQuery] = useState<{
//     page: number;
//     limit: number;
//     search: string;
//     startDate?: string;
//     endDate?: string;
//   }>({
//     page: 1,
//     limit: 10,
//     search: '',
//   });

//   const { data, isFetching } = useGetAllSaleQuery(query);
//   const [deleteSale] = useDeleteSaleMutation();

//   /**
//    * Pagination
//    */
//   const onChange: PaginationProps['onChange'] = (page) => {
//     setQuery((prev) => ({ ...prev, page }));
//   };

//   /**
//    * Date Filter
//    */
//   const handleDateChange = (
//     dates: [dayjs.Dayjs, dayjs.Dayjs] | null
//   ) => {
//     if (!dates) {
//       setQuery((prev) => ({
//         ...prev,
//         startDate: undefined,
//         endDate: undefined,
//       }));
//       return;
//     }

//     setQuery((prev) => ({
//       ...prev,
//       startDate: dates[0].format('YYYY-MM-DD'),
//       endDate: dates[1].format('YYYY-MM-DD'),
//       page: 1,
//     }));
//   };

//   /**
//    * Table Data
//    */
//   const tableData: SaleTableRow[] =
//     data?.data?.map((sale: ITableSale) => ({
//       key: sale._id,
//       productName: sale.productName,
//       productPrice: sale.productPrice,
//       buyerName: sale.buyerName,
//       quantity: sale.quantity,
//       totalPrice: sale.totalPrice,
//       date: formatDate(sale.date),
//     })) || [];

//   /**
//    * Excel Download
//    */
//   const handleDownloadExcel = () => {
//     if (!data?.data?.length) return;

//     const excelData = data.data.map((sale: ITableSale, index: number) => ({
//       'S.No': index + 1,
//       'Product Name': sale.productName,
//       'Product Price': sale.productPrice,
//       'Buyer Name': sale.buyerName,
//       Quantity: sale.quantity,
//       'Total Price': sale.totalPrice,
//       'Selling Date': formatDate(sale.date),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: 'xlsx',
//       type: 'array',
//     });

//     const blob = new Blob([excelBuffer], {
//       type:
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
//     });

//     saveAs(blob, `sales-report-${Date.now()}.xlsx`);
//   };

//   /**
//    * Table Columns
//    */
//   const columns: TableColumnsType<SaleTableRow> = [
//     { title: 'Product Name', dataIndex: 'productName' },
//     {
//       title: 'Product Price',
//       dataIndex: 'productPrice',
//       align: 'center',
//     },
//     {
//       title: 'Used Person Name',
//       dataIndex: 'buyerName',
//       align: 'center',
//     },
//     {
//       title: 'Quantity',
//       dataIndex: 'quantity',
//       align: 'center',
//     },
//     {
//       title: 'Total Price',
//       dataIndex: 'totalPrice',
//       align: 'center',
//     },
//     {
//       title: 'Selling Date',
//       dataIndex: 'date',
//       align: 'center',
//     },
//     {
//       title: 'Action',
//       align: 'center',
//       render: (_, record) => (
//         <DeleteModal id={record.key} deleteSale={deleteSale} />
//       ),
//       width: '1%',
//     },
//   ];

//   return (
//     <>
//       <Flex justify="space-between" style={{ margin: 8, gap: 8 }}>
//         <Flex gap={8}>
//           <RangePicker onChange={handleDateChange} />
//           <SearchInput
//             setQuery={setQuery}
//             placeholder="Search Sold Products..."
//           />
//         </Flex>

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
//           current={query.page}
//           onChange={onChange}
//           pageSize={query.limit}
//           total={data?.meta?.total}
//         />
//       </Flex>
//     </>
//   );
// };

// /**
//  * Delete Modal
//  */
// const DeleteModal = ({
//   id,
//   deleteSale,
// }: {
//   id: string;
//   deleteSale: any;
// }) => {
//   const [open, setOpen] = useState(false);

//   const handleDelete = async () => {
//     try {
//       const res = await deleteSale(id).unwrap();
//       toastMessage({ icon: 'success', text: res.message });
//       setOpen(false);
//     } catch (error: any) {
//       toastMessage({
//         icon: 'error',
//         text: error?.data?.message || 'Delete failed',
//       });
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <Button
//         danger
//         type="primary"
//         className="table-btn-small"
//         onClick={() => setOpen(true)}
//       >
//         <DeleteFilled />
//       </Button>

//       <Modal
//         title="Delete Sale"
//         open={open}
//         onCancel={() => setOpen(false)}
//         footer={null}
//       >
//         <div style={{ textAlign: 'center', padding: '1.5rem' }}>
//           <h3>Are you sure?</h3>
//           <p>You won’t be able to revert this.</p>

//           <Flex justify="center" gap={12} style={{ marginTop: 16 }}>
//             <Button onClick={() => setOpen(false)}>Cancel</Button>
//             <Button danger type="primary" onClick={handleDelete}>
//               Yes, Delete
//             </Button>
//           </Flex>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default SaleManagementPage;



// import { DeleteFilled } from '@ant-design/icons';
// import type { PaginationProps, TableColumnsType } from 'antd';
// import { Button, DatePicker, Flex, Modal, Pagination, Table } from 'antd';
// import { useState } from 'react';
// import SearchInput from '../../components/SearchInput';
// import toastMessage from '../../lib/toastMessage';
// import {
//   useDeleteSaleMutation,
//   useGetAllSaleQuery,
// } from '../../redux/features/management/saleApi';
// import { ITableSale } from '../../types/sale.type';
// import formatDate from '../../utils/formatDate';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import dayjs from 'dayjs';

// const { RangePicker } = DatePicker;

// /* ================= TABLE ROW TYPE ================= */

// interface SaleTableRow {
//   key: string;
//   productName: string;
//   productPrice: number;
//   buyerName: string;
//   customerDetails: string;
//   quantity: number;
//   totalPrice: number;
//   date: string;
// }

// /* ================= SALE MANAGEMENT PAGE ================= */

// const SaleManagementPage = () => {
//   const [query, setQuery] = useState<{
//     page: number;
//     limit: number;
//     search: string;
//     startDate?: string;
//     endDate?: string;
//   }>({
//     page: 1,
//     limit: 10,
//     search: '',
//   });

//   const { data, isFetching } = useGetAllSaleQuery(query);
//   const [deleteSale] = useDeleteSaleMutation();

//   /* ================= PAGINATION ================= */

//   const onChange: PaginationProps['onChange'] = (page) => {
//     setQuery((prev) => ({ ...prev, page }));
//   };

//   /* ================= DATE FILTER ================= */

//   const handleDateChange = (
//     dates: [dayjs.Dayjs, dayjs.Dayjs] | null
//   ) => {
//     if (!dates) {
//       setQuery((prev) => ({
//         ...prev,
//         startDate: undefined,
//         endDate: undefined,
//       }));
//       return;
//     }

//     setQuery((prev) => ({
//       ...prev,
//       startDate: dates[0].format('YYYY-MM-DD'),
//       endDate: dates[1].format('YYYY-MM-DD'),
//       page: 1,
//     }));
//   };

//   /* ================= TABLE DATA ================= */

//   const tableData: SaleTableRow[] =
//     data?.data?.map((sale: ITableSale) => ({
//       key: sale._id,
//       productName: sale.productName,
//       productPrice: sale.productPrice,
//       buyerName: sale.buyerName,
//       customerDetails: sale.customerDetails,
//       quantity: sale.quantity,
//       totalPrice: sale.totalPrice,
//       date: formatDate(sale.date),
//     })) || [];

//   /* ================= EXCEL DOWNLOAD ================= */

//   const handleDownloadExcel = () => {
//     if (!data?.data?.length) return;

//     const excelData = data.data.map((sale: ITableSale, index: number) => ({
//       'S.No': index + 1,
//       'Product Name': sale.productName,
//       'Product Price': sale.productPrice,
//       'Buyer Name': sale.buyerName,
//       'Customer Details': sale.customerDetails,
//       Quantity: sale.quantity,
//       'Total Price': sale.totalPrice,
//       'Selling Date': formatDate(sale.date),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: 'xlsx',
//       type: 'array',
//     });

//     const blob = new Blob([excelBuffer], {
//       type:
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
//     });

//     saveAs(blob, `sales-report-${Date.now()}.xlsx`);
//   };

//   /* ================= TABLE COLUMNS ================= */

//   const columns: TableColumnsType<SaleTableRow> = [
//     { title: 'Product Name', dataIndex: 'productName' },
//     {
//       title: 'Product Price',
//       dataIndex: 'productPrice',
//       align: 'center',
//     },
//     {
//       title: 'Used Person Name',
//       dataIndex: 'buyerName',
//       align: 'center',
//     },
//     {
//       title: 'Customer Details',
//       dataIndex: 'customerDetails',
//       align: 'center',
//     },
//     {
//       title: 'Quantity',
//       dataIndex: 'quantity',
//       align: 'center',
//     },
//     {
//       title: 'Total Price',
//       dataIndex: 'totalPrice',
//       align: 'center',
//     },
//     {
//       title: 'Selling Date',
//       dataIndex: 'date',
//       align: 'center',
//     },
//     {
//       title: 'Action',
//       align: 'center',
//       render: (_, record) => (
//         <DeleteModal id={record.key} deleteSale={deleteSale} />
//       ),
//       width: '1%',
//     },
//   ];

//   return (
//     <>
//       <Flex justify="space-between" style={{ margin: 8, gap: 8 }}>
//         <Flex gap={8}>
//           <RangePicker onChange={handleDateChange} />
//           <SearchInput
//             setQuery={setQuery}
//             placeholder="Search Sold Products..."
//           />
//         </Flex>

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
//           current={query.page}
//           onChange={onChange}
//           pageSize={query.limit}
//           total={data?.meta?.total}
//         />
//       </Flex>
//     </>
//   );
// };

// /* ================= DELETE MODAL ================= */

// const DeleteModal = ({
//   id,
//   deleteSale,
// }: {
//   id: string;
//   deleteSale: any;
// }) => {
//   const [open, setOpen] = useState(false);

//   const handleDelete = async () => {
//     try {
//       const res = await deleteSale(id).unwrap();
//       toastMessage({ icon: 'success', text: res.message });
//       setOpen(false);
//     } catch (error: any) {
//       toastMessage({
//         icon: 'error',
//         text: error?.data?.message || 'Delete failed',
//       });
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <Button
//         danger
//         type="primary"
//         className="table-btn-small"
//         onClick={() => setOpen(false)}
//       >
//         <DeleteFilled />
//       </Button>

//       <Modal
//         title="Delete Sale"
//         open={open}
//         onCancel={() => setOpen(false)}
//         footer={null}
//       >
//         <div style={{ textAlign: 'center', padding: '1.5rem' }}>
//           <h3>Are you sure?</h3>
//           <p>You won’t be able to revert this.</p>

//           <Flex justify="center" gap={12} style={{ marginTop: 16 }}>
//             <Button onClick={() => setOpen(false)}>Cancel</Button>
//             <Button danger type="primary" onClick={handleDelete}>
//               Yes, Delete
//             </Button>
//           </Flex>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default SaleManagementPage;




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