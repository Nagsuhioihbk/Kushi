// import { DeleteFilled, EditFilled } from '@ant-design/icons';
// import type { PaginationProps, TableColumnsType } from 'antd';
// import { Button, Flex, Modal, Pagination, Table } from 'antd';
// import { useState } from 'react';
// import { FieldValues, useForm } from 'react-hook-form';
// import {
//   useDeletePurchaseMutation,
//   useGetAllPurchasesQuery,
// } from '../../redux/features/management/purchaseApi';
// import { IProduct } from '../../types/product.types';
// import { IPurchase } from '../../types/purchase.types';
// import formatDate from '../../utils/formatDate';
// import toastMessage from '../../lib/toastMessage';
// import SearchInput from '../../components/SearchInput';

// const PurchaseManagementPage = () => {
//   const [query, setQuery] = useState({
//     page: 1,
//     limit: 10,
//     search: '',
//   });

//   const { data, isFetching } = useGetAllPurchasesQuery(query);

//   const onChange: PaginationProps['onChange'] = (page) => {
//     setQuery((prev) => ({ ...prev, page: page }));
//   };

//   const tableData = data?.data?.map((purchase: IPurchase) => ({
//     key: purchase._id,
//     sellerName: purchase.sellerName,
//     productName: purchase.productName,
//     price: purchase.unitPrice,
//     quantity: purchase.quantity,
//     totalPrice: purchase.totalPrice,
//     due: purchase.totalPrice - purchase.paid,
//     date: formatDate(purchase.createdAt),
//   }));

//   const columns: TableColumnsType<any> = [
//     {
//       title: 'Seller Name',
//       key: 'sellerName',
//       dataIndex: 'sellerName',
//     },
//     {
//       title: 'Product Name',
//       key: 'productName',
//       dataIndex: 'productName',
//     },
//     {
//       title: 'Price(per unit)',
//       key: 'price',
//       dataIndex: 'price',
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
//       title: 'Due',
//       key: 'due',
//       dataIndex: 'due',
//       align: 'center',
//     },
//     {
//       title: 'Date',
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

//   return (
//     <>
//       <Flex justify='end' style={{ margin: '5px' }}>
//         <SearchInput setQuery={setQuery} placeholder='Search Purchase...' />
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
//     console.log({ data, product });
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   // ! This is not complete, need to complete this to make it work
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
//   const [deletePurchase] = useDeletePurchaseMutation();

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await deletePurchase(id).unwrap();
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

// export default PurchaseManagementPage;




// import { DeleteFilled } from '@ant-design/icons';
// import type { PaginationProps, TableColumnsType } from 'antd';
// import { Button, Flex, Modal, Pagination, Table } from 'antd';
// import { useState } from 'react';
// import SearchInput from '../../components/SearchInput';
// import {
//   useDeletePurchaseMutation,
//   useGetAllPurchasesQuery,
// } from '../../redux/features/management/purchaseApi';
// import { IPurchase } from '../../types/purchase.types';
// import formatDate from '../../utils/formatDate';
// import toastMessage from '../../lib/toastMessage';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// /**
//  * Table Row Type
//  */
// interface PurchaseTableRow {
//   key: string;
//   sellerName: string;
//   productName: string;
//   price: number;
//   quantity: number;
//   totalPrice: number;
//   due: number;
//   date: string;
// }

// const PurchaseManagementPage = () => {
//   const [query, setQuery] = useState({
//     page: 1,
//     limit: 10,
//     search: '',
//   });

//   const { data, isFetching } = useGetAllPurchasesQuery(query);

//   const onChange: PaginationProps['onChange'] = (page) => {
//     setQuery((prev) => ({ ...prev, page }));
//   };

//   const tableData: PurchaseTableRow[] =
//     data?.data?.map((purchase: IPurchase) => ({
//       key: purchase._id,
//       sellerName: purchase.sellerName,
//       productName: purchase.productName,
//       price: purchase.unitPrice,
//       quantity: purchase.quantity,
//       totalPrice: purchase.totalPrice,
//       due: purchase.totalPrice - purchase.paid,
//       date: formatDate(purchase.createdAt),
//     })) || [];

//   /**
//    * Download Purchase Excel
//    */
//   const handleDownloadExcel = () => {
//     if (!data?.data?.length) return;

//     const excelData = data.data.map((purchase: IPurchase, index: number) => ({
//       'S.No': index + 1,
//       'Seller Name': purchase.sellerName,
//       'Product Name': purchase.productName,
//       'Unit Price': purchase.unitPrice,
//       Quantity: purchase.quantity,
//       'Total Price': purchase.totalPrice,
//       Due: purchase.totalPrice - purchase.paid,
//       Date: formatDate(purchase.createdAt),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchases');

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: 'xlsx',
//       type: 'array',
//     });

//     const blob = new Blob([excelBuffer], {
//       type:
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
//     });

//     saveAs(blob, `purchase-report-${Date.now()}.xlsx`);
//   };

//   const columns: TableColumnsType<PurchaseTableRow> = [
//     {
//       title: 'Seller Name',
//       dataIndex: 'sellerName',
//     },
//     {
//       title: 'Product Name',
//       dataIndex: 'productName',
//     },
//     {
//       title: 'Price (per unit)',
//       dataIndex: 'price',
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
//       title: 'Due',
//       dataIndex: 'due',
//       align: 'center',
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       align: 'center',
//     },
//     {
//       title: 'Action',
//       align: 'center',
//       render: (_, record) => <DeleteModal id={record.key} />,
//       width: '1%',
//     },
//   ];

//   return (
//     <>
//       <Flex justify="end" style={{ margin: '5px', gap: 8 }}>
//         <SearchInput setQuery={setQuery} placeholder="Search Purchase..." />
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
//   const [deletePurchase] = useDeletePurchaseMutation();

//   const handleDelete = async () => {
//     try {
//       const res = await deletePurchase(id).unwrap();
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
//         title="Delete Purchase"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <div style={{ textAlign: 'center', padding: '2rem' }}>
//           <h3>Are you sure you want to delete this purchase?</h3>
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

// export default PurchaseManagementPage;


import { DeleteFilled } from '@ant-design/icons';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, DatePicker, Flex, Modal, Pagination, Table } from 'antd';
import { useState, useMemo } from 'react';
import SearchInput from '../../components/SearchInput';
import {
  useDeletePurchaseMutation,
  useGetAllPurchasesQuery,
} from '../../redux/features/management/purchaseApi';
import { IPurchase } from '../../types/purchase.types';
import formatDate from '../../utils/formatDate';
import toastMessage from '../../lib/toastMessage';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const { RangePicker } = DatePicker;

interface PurchaseTableRow {
  key: string;
  sellerName: string;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  due: number;
  date: string;
}

const PurchaseManagementPage = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  const { data, isFetching } = useGetAllPurchasesQuery(query);

  // Pagination change
  const onChange: PaginationProps['onChange'] = (page) => {
    setQuery((prev) => ({ ...prev, page }));
  };

  // Map backend data to table rows
  const allData: PurchaseTableRow[] =
    data?.data?.map((purchase: IPurchase) => ({
      key: purchase._id,
      sellerName: purchase.sellerName,
      productName: purchase.productName,
      price: purchase.unitPrice,
      quantity: purchase.quantity,
      totalPrice: purchase.totalPrice,
      due: purchase.totalPrice - purchase.paid,
      date: formatDate(purchase.createdAt),
    })) || [];

  // Filter data client-side by search + date
  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      // Search filter
      const searchMatch =
        item.productName.toLowerCase().includes(query.search.toLowerCase()) ||
        item.sellerName.toLowerCase().includes(query.search.toLowerCase());

      // Date filter
      let dateMatch = true;
      if (dateRange) {
        const itemDate = new Date(item.date);
        const start = new Date(dateRange[0]);
        const end = new Date(dateRange[1]);
        // Include both start and end dates
        dateMatch = itemDate >= start && itemDate <= end;
      }

      return searchMatch && dateMatch;
    });
  }, [allData, query.search, dateRange]);

  // Excel Download
  const handleDownloadExcel = () => {
    if (!filteredData.length) return;

    const excelData = filteredData.map((purchase, index) => ({
      'S.No': index + 1,
      'Seller Name': purchase.sellerName,
      'Product Name': purchase.productName,
      'Unit Price': purchase.price,
      Quantity: purchase.quantity,
      'Total Price': purchase.totalPrice,
      Due: purchase.due,
      Date: purchase.date,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchases');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(blob, `purchase-report-${Date.now()}.xlsx`);
  };

  // Table columns
  const columns: TableColumnsType<PurchaseTableRow> = [
    { title: 'Seller Name', dataIndex: 'sellerName' },
    { title: 'Product Name', dataIndex: 'productName' },
    { title: 'Price (per unit)', dataIndex: 'price', align: 'center' },
    { title: 'Quantity', dataIndex: 'quantity', align: 'center' },
    { title: 'Total Price', dataIndex: 'totalPrice', align: 'center' },
    { title: 'Due', dataIndex: 'due', align: 'center' },
    { title: 'Date', dataIndex: 'date', align: 'center' },
    {
      title: 'Action',
      align: 'center',
      render: (_, record) => <DeleteModal id={record.key} />,
      width: '1%',
    },
  ];

  // Date range change handler
  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (!dates) {
      setDateRange(null); // clear filter
    } else {
      setDateRange(dateStrings); // set new range
    }
  };

  return (
    <>
      <Flex justify="end" style={{ margin: '5px', gap: 8 }}>
        <RangePicker
          onChange={handleDateChange}
          placeholder={['Start Date', 'End Date']}
          style={{ minWidth: 250 }}
          allowClear
        />
        <SearchInput setQuery={setQuery} placeholder="Search Purchase..." />
        <Button type="primary" onClick={handleDownloadExcel}>
          Download Excel
        </Button>
      </Flex>

      <Table
        size="small"
        loading={isFetching}
        columns={columns}
        dataSource={filteredData}
        pagination={false}
      />

      <Flex justify="center" style={{ marginTop: '1rem' }}>
        <Pagination
          current={query.page}
          onChange={onChange}
          defaultPageSize={query.limit}
          total={filteredData.length}
        />
      </Flex>
    </>
  );
};

/**
 * Delete Modal
 */
const DeleteModal = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePurchase] = useDeletePurchaseMutation();

  const handleDelete = async () => {
    try {
      const res = await deletePurchase(id).unwrap();
      if (res.statusCode === 200) {
        toastMessage({ icon: 'success', text: res.message });
        setIsModalOpen(false);
      }
    } catch (error: any) {
      setIsModalOpen(false);
      toastMessage({ icon: 'error', text: error.data?.message });
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(false)}
        type="primary"
        className="table-btn-small"
        style={{ backgroundColor: 'red' }}
      >
        <DeleteFilled />
      </Button>

      <Modal
        title="Delete Purchase"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>Are you sure you want to delete this purchase?</h3>
          <p>You won't be able to revert it.</p>

          <Flex justify="center" gap={12} style={{ marginTop: '1rem' }}>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button danger type="primary" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </Flex>
        </div>
      </Modal>
    </>
  );
};

export default PurchaseManagementPage;
