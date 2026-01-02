// import { DeleteFilled, EditFilled } from '@ant-design/icons';
// import type { PaginationProps, TableColumnsType } from 'antd';
// import { Button, Flex, Modal, Pagination, Table } from 'antd';
// import { useState } from 'react';
// import { FieldValues, useForm } from 'react-hook-form';
// import {
//   useDeleteSellerMutation,
//   useGetAllSellerQuery,
// } from '../../redux/features/management/sellerApi';
// import { IProduct, ISeller } from '../../types/product.types';
// import toastMessage from '../../lib/toastMessage';
// import SearchInput from '../../components/SearchInput';

// const SellerManagementPage = () => {
//   const [query, setQuery] = useState({
//     page: 1,
//     limit: 10,
//     search: '',
//   });

//   const { data, isFetching } = useGetAllSellerQuery(query);

//   const onChange: PaginationProps['onChange'] = (page) => {
//     setQuery((prev) => ({ ...prev, page: page }));
//   };

//   const tableData = data?.data?.map((seller: ISeller) => ({
//     key: seller._id,
//     name: seller.name,
//     email: seller.email,
//     contactNo: seller.contactNo,
//   }));

//   const columns: TableColumnsType<any> = [
//     {
//       title: 'Seller Name',
//       key: 'name',
//       dataIndex: 'name',
//     },
//     {
//       title: 'Email',
//       key: 'email',
//       dataIndex: 'email',
//       align: 'center',
//     },
//     {
//       title: 'Contact Number',
//       key: 'contactNo',
//       dataIndex: 'contactNo',
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
//         <SearchInput setQuery={setQuery} placeholder='Search Seller...' />
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

//   // ! Remove this early return to work with this component
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
//   const [deleteSeller] = useDeleteSellerMutation();

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await deleteSeller(id).unwrap();
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

// export default SellerManagementPage;





import { DeleteFilled } from '@ant-design/icons';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Flex, Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import SearchInput from '../../components/SearchInput';
import toastMessage from '../../lib/toastMessage';
import {
  useDeleteSellerMutation,
  useGetAllSellerQuery,
} from '../../redux/features/management/sellerApi';
import { ISeller } from '../../types/product.types';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Table Row Type
 */
interface SellerTableRow {
  key: string;
  name: string;
  email: string;
  contactNo: string;
}

const SellerManagementPage = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const { data, isFetching } = useGetAllSellerQuery(query);

  const onChange: PaginationProps['onChange'] = (page) => {
    setQuery((prev) => ({ ...prev, page }));
  };

  const tableData: SellerTableRow[] =
    data?.data?.map((seller: ISeller) => ({
      key: seller._id,
      name: seller.name,
      email: seller.email,
      contactNo: seller.contactNo,
    })) || [];

  /**
   * Download Sellers Excel
   */
  const handleDownloadExcel = () => {
    if (!data?.data?.length) return;

    const excelData = data.data.map((seller: ISeller, index: number) => ({
      'S.No': index + 1,
      'Seller Name': seller.name,
      Email: seller.email,
      'Contact Number': seller.contactNo,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sellers');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(blob, `seller-list-${Date.now()}.xlsx`);
  };

  const columns: TableColumnsType<SellerTableRow> = [
    {
      title: 'Seller Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNo',
      align: 'center',
    },
    {
      title: 'Action',
      align: 'center',
      render: (_, record) => <DeleteModal id={record.key} />,
      width: '1%',
    },
  ];

  return (
    <>
      <Flex justify="end" style={{ margin: '5px', gap: 8 }}>
        <SearchInput setQuery={setQuery} placeholder="Search Seller..." />
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
          current={query.page}
          onChange={onChange}
          defaultPageSize={query.limit}
          total={data?.meta?.total}
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
  const [deleteSeller] = useDeleteSellerMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteSeller(id).unwrap();
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
        title="Delete Seller"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>Are you sure you want to delete this seller?</h3>
          <p>You won't be able to revert it.</p>

          <Flex justify="center" gap={12} style={{ marginTop: '1rem' }}>
            <Button onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button danger type="primary" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </Flex>
        </div>
      </Modal>
    </>
  );
};

export default SellerManagementPage;
