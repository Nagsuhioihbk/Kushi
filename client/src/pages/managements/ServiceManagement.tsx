// import { useState } from 'react';
// import {
//   Button,
//   Table,
//   Space,
//   Modal,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   DatePicker,
//   Card,
//   Popconfirm,
//   Tag,
//   Row,
//   Col,
// } from 'antd';
// import { DeleteOutlined, EditOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
// import type { ColumnsType } from 'antd/es/table';
// import dayjs from 'dayjs';
// import * as XLSX from 'xlsx';
// import {
//   useGetAllServicesQuery,
//   useDeleteServiceMutation,
//   useUpdateServiceMutation,
// } from '../redux/features/management/serviceApi';
// import toastMessage from '../lib/toastMessage';

// interface SubService {
//   subServiceName: string;
//   frequency: string;
//   plannedCount: number;
// }

// interface ServiceGroup {
//   mainService: string;
//   subServices: SubService[];
// }

// interface Service {
//   _id: string;
//   clientName: string;
//   gstPercentage: number;
//   billingType: string;
//   billingAddress: string;
//   workAddress: string;
//   serviceStartDate: string;
//   serviceEndDate: string;
//   services: ServiceGroup[];
//   createdAt: string;
// }

// const mainServices = [
//   'AMC',
//   'Deep Cleaning',
//   'Bathroom Cleaning',
//   'Kitchen Cleaning',
//   'Pest Control',
// ];

// const subServices = [
//   'Rodent Control',
//   'Mosquito Control',
//   'Termite Control',
//   'General Pest Control',
//   'Snake Control',
// ];

// const frequencyOptions = [
//   { label: 'Daily', value: 'daily', count: 30 },
//   { label: 'Weekly Once', value: 'weekly_once', count: 4 },
//   { label: 'Weekly Twice', value: 'weekly_twice', count: 8 },
//   { label: 'Weekly Thrice', value: 'weekly_thrice', count: 12 },
//   { label: 'Monthly Once', value: 'monthly_once', count: 1 },
//   { label: 'Quarterly Once', value: 'quarterly_once', count: 4 },
//   { label: 'Yearly Once', value: 'yearly_once', count: 1 },
// ];

// const ServiceManagement = () => {
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [form] = Form.useForm();

//   const { data: servicesData, isLoading } = useGetAllServicesQuery(undefined);
//   const [deleteService] = useDeleteServiceMutation();
//   const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

//   const services = servicesData?.data || [];

//   const handleEdit = (record: Service) => {
//     setSelectedService(record);
//     form.setFieldsValue({
//       ...record,
//       serviceStartDate: dayjs(record.serviceStartDate),
//       serviceEndDate: dayjs(record.serviceEndDate),
//     });
//     setEditModalVisible(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await deleteService(id).unwrap();
//       toastMessage({ icon: 'success', text: res.message || 'Service deleted successfully' });
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to delete service' });
//     }
//   };

//   const handleUpdate = async (values: any) => {
//     try {
//       const payload = {
//         ...values,
//         serviceStartDate: values.serviceStartDate?.toISOString(),
//         serviceEndDate: values.serviceEndDate?.toISOString(),
//       };

//       const res = await updateService({ id: selectedService?._id, ...payload }).unwrap();
      
//       if (res.statusCode === 200) {
//         toastMessage({ icon: 'success', text: res.message || 'Service updated successfully' });
//         setEditModalVisible(false);
//         form.resetFields();
//       }
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to update service' });
//     }
//   };

//   const handleDownloadExcel = () => {
//     const exportData = services.map((service: Service) => ({
//       'Client Name': service.clientName,
//       'GST %': service.gstPercentage,
//       'Billing Type': service.billingType,
//       'Work Address': service.workAddress,
//       'Billing Address': service.billingAddress,
//       'Start Date': dayjs(service.serviceStartDate).format('DD/MM/YYYY'),
//       'End Date': dayjs(service.serviceEndDate).format('DD/MM/YYYY'),
//       'Services': service.services.map(s => s.mainService).join(', '),
//       'Created At': dayjs(service.createdAt).format('DD/MM/YYYY HH:mm'),
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Services');
//     XLSX.writeFile(wb, `services_${dayjs().format('YYYY-MM-DD')}.xlsx`);
//     toastMessage({ icon: 'success', text: 'Excel downloaded successfully' });
//   };

//   const columns: ColumnsType<Service> = [
//     {
//       title: 'Client Name',
//       dataIndex: 'clientName',
//       key: 'clientName',
//       width: 200,
//     },
//     {
//       title: 'GST %',
//       dataIndex: 'gstPercentage',
//       key: 'gstPercentage',
//       width: 80,
//       render: (value) => `${value}%`,
//     },
//     {
//       title: 'Billing Type',
//       dataIndex: 'billingType',
//       key: 'billingType',
//       width: 120,
//       render: (value) => <Tag color="blue">{value}</Tag>,
//     },
//     {
//       title: 'Services',
//       dataIndex: 'services',
//       key: 'services',
//       width: 250,
//       render: (services: ServiceGroup[]) => (
//         <Space direction="vertical" size="small">
//           {services.map((s, idx) => (
//             <Tag key={idx} color="green">
//               {s.mainService} ({s.subServices.length})
//             </Tag>
//           ))}
//         </Space>
//       ),
//     },
//     {
//       title: 'Start Date',
//       dataIndex: 'serviceStartDate',
//       key: 'serviceStartDate',
//       width: 120,
//       render: (date) => dayjs(date).format('DD/MM/YYYY'),
//     },
//     {
//       title: 'End Date',
//       dataIndex: 'serviceEndDate',
//       key: 'serviceEndDate',
//       width: 120,
//       render: (date) => dayjs(date).format('DD/MM/YYYY'),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 150,
//       fixed: 'right',
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             size="small"
//             onClick={() => handleEdit(record)}
//           >
//             Edit
//           </Button>
//           <Popconfirm
//             title="Are you sure you want to delete this service?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="primary" danger icon={<DeleteOutlined />} size="small">
//               Delete
//             </Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '24px' }}>
//       <Card>
//         <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
//           <Col>
//             <h2 style={{ margin: 0 }}>Service Management</h2>
//           </Col>
//           <Col>
//             <Space>
//               <Button
//                 type="primary"
//                 icon={<DownloadOutlined />}
//                 onClick={handleDownloadExcel}
//                 disabled={services.length === 0}
//               >
//                 Download Excel
//               </Button>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => (window.location.href = '/services/create')}
//               >
//                 Add New Service
//               </Button>
//             </Space>
//           </Col>
//         </Row>

//         <Table
//           columns={columns}
//           dataSource={services}
//           rowKey="_id"
//           loading={isLoading}
//           scroll={{ x: 1200 }}
//           pagination={{
//             pageSize: 10,
//             showSizeChanger: true,
//             showTotal: (total) => `Total ${total} services`,
//           }}
//         />
//       </Card>

//       {/* Edit Modal */}
//       <Modal
//         title="Edit Service"
//         open={editModalVisible}
//         onCancel={() => {
//           setEditModalVisible(false);
//           form.resetFields();
//         }}
//         footer={null}
//         width={800}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleUpdate}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="clientName"
//                 label="Client Name"
//                 rules={[{ required: true }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 name="gstPercentage"
//                 label="GST %"
//                 rules={[{ required: true }]}
//               >
//                 <InputNumber min={0} max={28} style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 name="billingType"
//                 label="Billing Type"
//                 rules={[{ required: true }]}
//               >
//                 <Select>
//                   <Select.Option value="service">Service to Service</Select.Option>
//                   <Select.Option value="monthly">Monthly</Select.Option>
//                   <Select.Option value="quarterly">Quarterly</Select.Option>
//                   <Select.Option value="yearly">Yearly</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 name="serviceStartDate"
//                 label="Start Date"
//                 rules={[{ required: true }]}
//               >
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 name="serviceEndDate"
//                 label="End Date"
//                 rules={[{ required: true }]}
//               >
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>

//             <Col span={24}>
//               <Form.Item
//                 name="workAddress"
//                 label="Work Address"
//                 rules={[{ required: true }]}
//               >
//                 <Input.TextArea rows={2} />
//               </Form.Item>
//             </Col>

//             <Col span={24}>
//               <Form.Item
//                 name="billingAddress"
//                 label="Billing Address"
//                 rules={[{ required: true }]}
//               >
//                 <Input.TextArea rows={2} />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* Services Section */}
//           <Card title="Services" size="small">
//             <Form.List name="services">
//               {(serviceFields, { add: addService, remove: removeService }) => (
//                 <>
//                   {serviceFields.map(({ key, name }) => (
//                     <Card key={key} type="inner" size="small" style={{ marginBottom: 12 }}>
//                       <Space align="start" style={{ display: 'flex', marginBottom: 8 }}>
//                         <Form.Item
//                           name={[name, 'mainService']}
//                           rules={[{ required: true }]}
//                         >
//                           <Select placeholder="Main Service" style={{ width: 200 }}>
//                             {mainServices.map((ms) => (
//                               <Select.Option key={ms} value={ms}>
//                                 {ms}
//                               </Select.Option>
//                             ))}
//                           </Select>
//                         </Form.Item>
//                         <Button danger size="small" onClick={() => removeService(name)}>
//                           Remove
//                         </Button>
//                       </Space>

//                       <Form.List name={[name, 'subServices']}>
//                         {(subFields, { add: addSub, remove: removeSub }) => (
//                           <>
//                             {subFields.map(({ key: subKey, name: subName }) => (
//                               <Space key={subKey} style={{ display: 'flex', marginBottom: 8 }}>
//                                 <Form.Item
//                                   name={[subName, 'subServiceName']}
//                                   rules={[{ required: true }]}
//                                 >
//                                   <Select placeholder="Sub Service" style={{ width: 180 }}>
//                                     {subServices.map((ss) => (
//                                       <Select.Option key={ss} value={ss}>
//                                         {ss}
//                                       </Select.Option>
//                                     ))}
//                                   </Select>
//                                 </Form.Item>

//                                 <Form.Item
//                                   name={[subName, 'frequency']}
//                                   rules={[{ required: true }]}
//                                 >
//                                   <Select placeholder="Frequency" style={{ width: 150 }}>
//                                     {frequencyOptions.map((freq) => (
//                                       <Select.Option key={freq.value} value={freq.value}>
//                                         {freq.label}
//                                       </Select.Option>
//                                     ))}
//                                   </Select>
//                                 </Form.Item>

//                                 <Form.Item
//                                   name={[subName, 'plannedCount']}
//                                   rules={[{ required: true }]}
//                                 >
//                                   <InputNumber min={1} placeholder="Count" />
//                                 </Form.Item>

//                                 <Button danger size="small" onClick={() => removeSub(subName)}>
//                                   Remove
//                                 </Button>
//                               </Space>
//                             ))}
//                             <Button type="dashed" size="small" onClick={() => addSub()}>
//                               + Add Sub Service
//                             </Button>
//                           </>
//                         )}
//                       </Form.List>
//                     </Card>
//                   ))}
//                   <Button type="dashed" onClick={() => addService()}>
//                     + Add Main Service
//                   </Button>
//                 </>
//               )}
//             </Form.List>
//           </Card>

//           <Form.Item style={{ marginTop: 16, marginBottom: 0 }}>
//             <Space style={{ float: 'right' }}>
//               <Button onClick={() => setEditModalVisible(false)}>Cancel</Button>
//               <Button type="primary" htmlType="submit" loading={isUpdating}>
//                 Update Service
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ServiceManagement;





// import { useState } from 'react';
// import {
//   Button,
//   Table,
//   Space,
//   Modal,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   DatePicker,
//   Card,
//   Popconfirm,
//   Tag,
//   Row,
//   Col,
// } from 'antd';
// import { DeleteOutlined, EditOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
// import type { ColumnsType } from 'antd/es/table';
// import dayjs from 'dayjs';
// import * as XLSX from 'xlsx';
// import {
//   useGetAllServicesQuery,
//   useDeleteServiceMutation,
//   useUpdateServiceMutation,
// } from '../../redux/features/management/serviceApi';
// import toastMessage from '../../lib/toastMessage';

// interface SubService {
//   subServiceName: string;
//   frequency: string;
//   plannedCount: number;
// }

// interface ServiceGroup {
//   mainService: string;
//   subServices: SubService[];
// }

// interface Service {
//   _id: string;
//   clientName: string;
//   gstPercentage: number;
//   billingType: string;
//   billingAddress: string;
//   workAddress: string;
//   serviceStartDate: string;
//   serviceEndDate: string;
//   services: ServiceGroup[];
//   createdAt: string;
// }

// const mainServices = [
//   'AMC',
//   'Deep Cleaning',
//   'Bathroom Cleaning',
//   'Kitchen Cleaning',
//   'Pest Control',
// ];

// const subServices = [
//   'Rodent Control',
//   'Mosquito Control',
//   'Termite Control',
//   'General Pest Control',
//   'Snake Control',
// ];

// const frequencyOptions = [
//   { label: 'Daily', value: 'daily', count: 30 },
//   { label: 'Weekly Once', value: 'weekly_once', count: 4 },
//   { label: 'Weekly Twice', value: 'weekly_twice', count: 8 },
//   { label: 'Weekly Thrice', value: 'weekly_thrice', count: 12 },
//   { label: 'Monthly Once', value: 'monthly_once', count: 1 },
//   { label: 'Quarterly Once', value: 'quarterly_once', count: 4 },
//   { label: 'Yearly Once', value: 'yearly_once', count: 1 },
// ];

// const ServiceManagement = () => {
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [form] = Form.useForm();

//   const { data: servicesData, isLoading } = useGetAllServicesQuery(undefined);
//   const [deleteService] = useDeleteServiceMutation();
//   const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

//   const services = servicesData?.data || [];

//   const handleEdit = (record: Service) => {
//     setSelectedService(record);
//     form.setFieldsValue({
//       ...record,
//       serviceStartDate: dayjs(record.serviceStartDate),
//       serviceEndDate: dayjs(record.serviceEndDate),
//     });
//     setEditModalVisible(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await deleteService(id).unwrap();
//       toastMessage({ icon: 'success', text: res.message || 'Service deleted successfully' });
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to delete service' });
//     }
//   };

//   const handleUpdate = async (values: any) => {
//     try {
//       const payload = {
//         ...values,
//         serviceStartDate: values.serviceStartDate?.toISOString(),
//         serviceEndDate: values.serviceEndDate?.toISOString(),
//       };

//       // FIXED: Match the API signature { id, data }
//       const res = await updateService({ 
//         id: selectedService?._id, 
//         data: payload 
//       }).unwrap();
      
//       if (res.statusCode === 200) {
//         toastMessage({ icon: 'success', text: res.message || 'Service updated successfully' });
//         setEditModalVisible(false);
//         form.resetFields();
//       }
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to update service' });
//     }
//   };

//   const handleDownloadExcel = () => {
//     const exportData = services.map((service: Service) => ({
//       'Client Name': service.clientName,
//       'GST %': service.gstPercentage,
//       'Billing Type': service.billingType,
//       'Work Address': service.workAddress,
//       'Billing Address': service.billingAddress,
//       'Start Date': dayjs(service.serviceStartDate).format('DD/MM/YYYY'),
//       'End Date': dayjs(service.serviceEndDate).format('DD/MM/YYYY'),
//       'Services': service.services.map(s => s.mainService).join(', '),
//       'Created At': dayjs(service.createdAt).format('DD/MM/YYYY HH:mm'),
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Services');
//     XLSX.writeFile(wb, `services_${dayjs().format('YYYY-MM-DD')}.xlsx`);
//     toastMessage({ icon: 'success', text: 'Excel downloaded successfully' });
//   };

//   const columns: ColumnsType<Service> = [
//     {
//       title: 'Client Name',
//       dataIndex: 'clientName',
//       key: 'clientName',
//       width: 200,
//     },
//     {
//       title: 'GST %',
//       dataIndex: 'gstPercentage',
//       key: 'gstPercentage',
//       width: 80,
//       render: (value) => `${value}%`,
//     },
//     {
//       title: 'Billing Type',
//       dataIndex: 'billingType',
//       key: 'billingType',
//       width: 120,
//       render: (value) => <Tag color="blue">{value}</Tag>,
//     },
//     {
//       title: 'Services',
//       dataIndex: 'services',
//       key: 'services',
//       width: 250,
//       render: (services: ServiceGroup[]) => (
//         <Space direction="vertical" size="small">
//           {services.map((s, idx) => (
//             <Tag key={idx} color="green">
//               {s.mainService} ({s.subServices.length})
//             </Tag>
//           ))}
//         </Space>
//       ),
//     },
//     {
//       title: 'Start Date',
//       dataIndex: 'serviceStartDate',
//       key: 'serviceStartDate',
//       width: 120,
//       render: (date) => dayjs(date).format('DD/MM/YYYY'),
//     },
//     {
//       title: 'End Date',
//       dataIndex: 'serviceEndDate',
//       key: 'serviceEndDate',
//       width: 120,
//       render: (date) => dayjs(date).format('DD/MM/YYYY'),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 150,
//       fixed: 'right',
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             size="small"
//             onClick={() => handleEdit(record)}
//           >
//             Edit
//           </Button>
//           <Popconfirm
//             title="Are you sure you want to delete this service?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="primary" danger icon={<DeleteOutlined />} size="small">
//               Delete
//             </Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '24px' }}>
//       <Card>
//         <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
//           <Col>
//             <h2 style={{ margin: 0 }}>Service Management</h2>
//           </Col>
//           <Col>
//             <Space>
//               <Button
//                 type="primary"
//                 icon={<DownloadOutlined />}
//                 onClick={handleDownloadExcel}
//                 disabled={services.length === 0}
//               >
//                 Download Excel
//               </Button>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => (window.location.href = '/services/create')}
//               >
//                 Add New Service
//               </Button>
//             </Space>
//           </Col>
//         </Row>

//         <Table
//           columns={columns}
//           dataSource={services}
//           rowKey="_id"
//           loading={isLoading}
//           scroll={{ x: 1200 }}
//           pagination={{
//             pageSize: 10,
//             showSizeChanger: true,
//             showTotal: (total) => `Total ${total} services`,
//           }}
//         />
//       </Card>

//       {/* Edit Modal */}
//       <Modal
//         title="Edit Service"
//         open={editModalVisible}
//         onCancel={() => {
//           setEditModalVisible(false);
//           form.resetFields();
//         }}
//         footer={null}
//         width={800}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleUpdate}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="clientName"
//                 label="Client Name"
//                 rules={[{ required: true }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 name="gstPercentage"
//                 label="GST %"
//                 rules={[{ required: true }]}
//               >
//                 <InputNumber min={0} max={28} style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 name="billingType"
//                 label="Billing Type"
//                 rules={[{ required: true }]}
//               >
//                 <Select>
//                   <Select.Option value="service">Service to Service</Select.Option>
//                   <Select.Option value="monthly">Monthly</Select.Option>
//                   <Select.Option value="quarterly">Quarterly</Select.Option>
//                   <Select.Option value="yearly">Yearly</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 name="serviceStartDate"
//                 label="Start Date"
//                 rules={[{ required: true }]}
//               >
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 name="serviceEndDate"
//                 label="End Date"
//                 rules={[{ required: true }]}
//               >
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>

//             <Col span={24}>
//               <Form.Item
//                 name="workAddress"
//                 label="Work Address"
//                 rules={[{ required: true }]}
//               >
//                 <Input.TextArea rows={2} />
//               </Form.Item>
//             </Col>

//             <Col span={24}>
//               <Form.Item
//                 name="billingAddress"
//                 label="Billing Address"
//                 rules={[{ required: true }]}
//               >
//                 <Input.TextArea rows={2} />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* Services Section */}
//           <Card title="Services" size="small">
//             <Form.List name="services">
//               {(serviceFields, { add: addService, remove: removeService }) => (
//                 <>
//                   {serviceFields.map(({ key, name }) => (
//                     <Card key={key} type="inner" size="small" style={{ marginBottom: 12 }}>
//                       <Space align="start" style={{ display: 'flex', marginBottom: 8 }}>
//                         <Form.Item
//                           name={[name, 'mainService']}
//                           rules={[{ required: true }]}
//                         >
//                           <Select placeholder="Main Service" style={{ width: 200 }}>
//                             {mainServices.map((ms) => (
//                               <Select.Option key={ms} value={ms}>
//                                 {ms}
//                               </Select.Option>
//                             ))}
//                           </Select>
//                         </Form.Item>
//                         <Button danger size="small" onClick={() => removeService(name)}>
//                           Remove
//                         </Button>
//                       </Space>

//                       <Form.List name={[name, 'subServices']}>
//                         {(subFields, { add: addSub, remove: removeSub }) => (
//                           <>
//                             {subFields.map(({ key: subKey, name: subName }) => (
//                               <Space key={subKey} style={{ display: 'flex', marginBottom: 8 }}>
//                                 <Form.Item
//                                   name={[subName, 'subServiceName']}
//                                   rules={[{ required: true }]}
//                                 >
//                                   <Select placeholder="Sub Service" style={{ width: 180 }}>
//                                     {subServices.map((ss) => (
//                                       <Select.Option key={ss} value={ss}>
//                                         {ss}
//                                       </Select.Option>
//                                     ))}
//                                   </Select>
//                                 </Form.Item>

//                                 <Form.Item
//                                   name={[subName, 'frequency']}
//                                   rules={[{ required: true }]}
//                                 >
//                                   <Select placeholder="Frequency" style={{ width: 150 }}>
//                                     {frequencyOptions.map((freq) => (
//                                       <Select.Option key={freq.value} value={freq.value}>
//                                         {freq.label}
//                                       </Select.Option>
//                                     ))}
//                                   </Select>
//                                 </Form.Item>

//                                 <Form.Item
//                                   name={[subName, 'plannedCount']}
//                                   rules={[{ required: true }]}
//                                 >
//                                   <InputNumber min={1} placeholder="Count" />
//                                 </Form.Item>

//                                 <Button danger size="small" onClick={() => removeSub(subName)}>
//                                   Remove
//                                 </Button>
//                               </Space>
//                             ))}
//                             <Button type="dashed" size="small" onClick={() => addSub()}>
//                               + Add Sub Service
//                             </Button>
//                           </>
//                         )}
//                       </Form.List>
//                     </Card>
//                   ))}
//                   <Button type="dashed" onClick={() => addService()}>
//                     + Add Main Service
//                   </Button>
//                 </>
//               )}
//             </Form.List>
//           </Card>

//           <Form.Item style={{ marginTop: 16, marginBottom: 0 }}>
//             <Space style={{ float: 'right' }}>
//               <Button onClick={() => setEditModalVisible(false)}>Cancel</Button>
//               <Button type="primary" htmlType="submit" loading={isUpdating}>
//                 Update Service
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ServiceManagement;




// import { useState } from 'react';
// import {
//   Button,
//   Table,
//   Space,
//   Modal,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   DatePicker,
//   Card,
//   Popconfirm,
//   Tag,
//   Row,
//   Col,
//   Typography,
//   Divider,
//   Badge,
//   Tooltip,
//   Checkbox,
// } from 'antd';
// import {
//   DeleteOutlined,
//   EditOutlined,
//   DownloadOutlined,
//   PlusOutlined,
//   EyeOutlined,
//   CalendarOutlined,
//   UserOutlined,
//   FileTextOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
// } from '@ant-design/icons';
// import type { ColumnsType } from 'antd/es/table';
// import dayjs from 'dayjs';
// import * as XLSX from 'xlsx';
// import {
//   useGetAllServicesQuery,
//   useDeleteServiceMutation,
//   useUpdateServiceMutation,
// } from '../../redux/features/management/serviceApi';
// import toastMessage from '../../lib/toastMessage';

// const { Title, Text } = Typography;

// interface Visit {
//   visitNumber: number;
//   date: string | null;
//   person: string;
//   completed: boolean;
// }

// interface ExtraService {
//   description: string;
//   date: string | null;
//   person: string;
// }

// interface SubService {
//   subServiceName: string;
//   frequency: string;
//   plannedCount: number;
//   visits: Visit[];
//   extraServices: ExtraService[];
// }

// interface ServiceGroup {
//   mainService: string;
//   subServices: SubService[];
// }

// interface Service {
//   _id: string;
//   clientName: string;
//   gstPercentage: number;
//   billingType: string;
//   billingAddress: string;
//   workAddress: string;
//   serviceStartDate: string;
//   serviceEndDate: string;
//   services: ServiceGroup[];
//   createdAt: string;
// }

// const mainServices = [
//   'AMC',
//   'Deep Cleaning',
//   'Bathroom Cleaning',
//   'Kitchen Cleaning',
//   'Pest Control',
// ];

// const subServices = [
//   'Rodent Control',
//   'Mosquito Control',
//   'Termite Control',
//   'General Pest Control',
//   'Snake Control',
// ];

// const frequencyOptions = [
//   { label: 'Daily', value: 'daily', count: 30 },
//   { label: 'Weekly Once', value: 'weekly_once', count: 4 },
//   { label: 'Weekly Twice', value: 'weekly_twice', count: 8 },
//   { label: 'Weekly Thrice', value: 'weekly_thrice', count: 12 },
//   { label: 'Monthly Once', value: 'monthly_once', count: 1 },
//   { label: 'Quarterly Once', value: 'quarterly_once', count: 4 },
//   { label: 'Yearly Once', value: 'yearly_once', count: 1 },
// ];

// const ServiceManagement = () => {
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [form] = Form.useForm();

//   const { data: servicesData, isLoading } = useGetAllServicesQuery(undefined);
//   const [deleteService] = useDeleteServiceMutation();
//   const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

//   const services = servicesData?.data || [];

//   // Calculate statistics
//   const calculateServiceStats = (service: Service) => {
//     let totalVisits = 0;
//     let completedVisits = 0;
//     let totalExtra = 0;

//     service.services.forEach((sg) => {
//       sg.subServices.forEach((ss) => {
//         totalVisits += ss.visits?.length || 0;
//         completedVisits += ss.visits?.filter((v) => v.completed).length || 0;
//         totalExtra += ss.extraServices?.filter((e) => e.description && e.date).length || 0;
//       });
//     });

//     return { totalVisits, completedVisits, totalExtra };
//   };

//   const handleView = (record: Service) => {
//     setSelectedService(record);
//     setViewModalVisible(true);
//   };

//   const handleEdit = (record: Service) => {
//     setSelectedService(record);
    
//     // Transform the data to include dayjs objects for dates
//     const transformedServices = record.services.map(service => ({
//       ...service,
//       subServices: service.subServices.map(subService => ({
//         ...subService,
//         visits: subService.visits?.map(visit => ({
//           ...visit,
//           date: visit.date ? dayjs(visit.date) : null,
//         })) || [],
//         extraServices: subService.extraServices?.map(extra => ({
//           ...extra,
//           date: extra.date ? dayjs(extra.date) : null,
//         })) || [],
//       })),
//     }));

//     form.setFieldsValue({
//       ...record,
//       serviceStartDate: dayjs(record.serviceStartDate),
//       serviceEndDate: dayjs(record.serviceEndDate),
//       services: transformedServices,
//     });
//     setEditModalVisible(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await deleteService(id).unwrap();
//       toastMessage({ icon: 'success', text: res.message || 'Service deleted successfully' });
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to delete service' });
//     }
//   };

//   const handleUpdate = async (values: any) => {
//     try {
//       // Transform the data back to ISO strings
//       const transformedServices = values.services.map((service: any) => ({
//         ...service,
//         subServices: service.subServices.map((subService: any) => ({
//           ...subService,
//           visits: subService.visits?.map((visit: any) => ({
//             ...visit,
//             date: visit.date ? visit.date.toISOString() : null,
//             completed: !!(visit.date && visit.person),
//           })) || [],
//           extraServices: subService.extraServices?.map((extra: any) => ({
//             ...extra,
//             date: extra.date ? extra.date.toISOString() : null,
//           })).filter((e: any) => e.description || e.date || e.person) || [],
//         })),
//       }));

//       const payload = {
//         ...values,
//         serviceStartDate: values.serviceStartDate?.toISOString(),
//         serviceEndDate: values.serviceEndDate?.toISOString(),
//         services: transformedServices,
//       };

//       const res = await updateService({
//         id: selectedService?._id,
//         data: payload,
//       }).unwrap();

//       if (res.statusCode === 200) {
//         toastMessage({ icon: 'success', text: res.message || 'Service updated successfully' });
//         setEditModalVisible(false);
//         form.resetFields();
//       }
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to update service' });
//     }
//   };

//   const handleDownloadExcel = () => {
//     const exportData = services.map((service: Service) => {
//       const stats = calculateServiceStats(service);
//       return {
//         'Client Name': service.clientName,
//         'GST %': service.gstPercentage,
//         'Billing Type': service.billingType,
//         'Work Address': service.workAddress,
//         'Billing Address': service.billingAddress,
//         'Start Date': dayjs(service.serviceStartDate).format('DD/MM/YYYY'),
//         'End Date': dayjs(service.serviceEndDate).format('DD/MM/YYYY'),
//         'Main Services': service.services.map((s) => s.mainService).join(', '),
//         'Total Visits': stats.totalVisits,
//         'Completed Visits': stats.completedVisits,
//         'Extra Services': stats.totalExtra,
//         'Created At': dayjs(service.createdAt).format('DD/MM/YYYY HH:mm'),
//       };
//     });

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Services');
//     XLSX.writeFile(wb, `services_${dayjs().format('YYYY-MM-DD')}.xlsx`);
//     toastMessage({ icon: 'success', text: 'Excel downloaded successfully' });
//   };

//   const columns: ColumnsType<Service> = [
//     {
//       title: 'Client Details',
//       key: 'clientDetails',
//       width: 250,
//       render: (_, record) => (
//         <div>
//           <Text strong style={{ display: 'block', fontSize: 14 }}>
//             {record.clientName}
//           </Text>
//           <Space size={4} style={{ marginTop: 4 }}>
//             <Tag color="blue">{record.billingType}</Tag>
//             <Tag color="green">{record.gstPercentage}% GST</Tag>
//           </Space>
//         </div>
//       ),
//     },
//     {
//       title: 'Service Period',
//       key: 'period',
//       width: 180,
//       render: (_, record) => (
//         <div>
//           <div style={{ marginBottom: 4 }}>
//             <CalendarOutlined style={{ marginRight: 4, color: '#1890ff' }} />
//             <Text style={{ fontSize: 12 }}>
//               {dayjs(record.serviceStartDate).format('DD MMM YYYY')}
//             </Text>
//           </div>
//           <div>
//             <CalendarOutlined style={{ marginRight: 4, color: '#52c41a' }} />
//             <Text style={{ fontSize: 12 }}>
//               {dayjs(record.serviceEndDate).format('DD MMM YYYY')}
//             </Text>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Services',
//       key: 'services',
//       width: 200,
//       render: (_, record) => (
//         <Space direction="vertical" size={4}>
//           {record.services.slice(0, 2).map((s, idx) => (
//             <Tag key={idx} color="purple">
//               {s.mainService}
//             </Tag>
//           ))}
//           {record.services.length > 2 && (
//             <Tag color="default">+{record.services.length - 2} more</Tag>
//           )}
//         </Space>
//       ),
//     },
//     {
//       title: 'Progress',
//       key: 'progress',
//       width: 150,
//       render: (_, record) => {
//         const stats = calculateServiceStats(record);
//         const percentage =
//           stats.totalVisits > 0
//             ? Math.round((stats.completedVisits / stats.totalVisits) * 100)
//             : 0;

//         return (
//           <Space direction="vertical" size={4}>
//             <div>
//               <Badge
//                 status={percentage === 100 ? 'success' : 'processing'}
//                 text={
//                   <Text style={{ fontSize: 12 }}>
//                     {stats.completedVisits}/{stats.totalVisits} Visits
//                   </Text>
//                 }
//               />
//             </div>
//             {stats.totalExtra > 0 && (
//               <Text type="secondary" style={{ fontSize: 11 }}>
//                 +{stats.totalExtra} Extra
//               </Text>
//             )}
//           </Space>
//         );
//       },
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 180,
//       fixed: 'right',
//       render: (_, record) => (
//         <Space size={4}>
//           <Tooltip title="View Details">
//             <Button
//               type="default"
//               icon={<EyeOutlined />}
//               size="small"
//               onClick={() => handleView(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Edit">
//             <Button
//               type="primary"
//               icon={<EditOutlined />}
//               size="small"
//               onClick={() => handleEdit(record)}
//             />
//           </Tooltip>
//           <Popconfirm
//             title="Delete Service"
//             description="Are you sure you want to delete this service?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Tooltip title="Delete">
//               <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
//             </Tooltip>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
//       <Card bordered={false} style={{ marginBottom: 16 }}>
//         <Row justify="space-between" align="middle">
//           <Col>
//             <Title level={3} style={{ margin: 0 }}>
//               <FileTextOutlined style={{ marginRight: 12, color: '#1890ff' }} />
//               Service Management
//             </Title>
//             <Text type="secondary">
//               Manage and track all service contracts and visits
//             </Text>
//           </Col>
//           <Col>
//             <Space size={8}>
//               <Button
//                 icon={<DownloadOutlined />}
//                 onClick={handleDownloadExcel}
//                 disabled={services.length === 0}
//                 size="large"
//               >
//                 Export Excel
//               </Button>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => (window.location.href = '/services/create')}
//                 size="large"
//               >
//                 Add New Service
//               </Button>
//             </Space>
//           </Col>
//         </Row>
//       </Card>

//       <Card bordered={false}>
//         <Table
//           columns={columns}
//           dataSource={services}
//           rowKey="_id"
//           loading={isLoading}
//           scroll={{ x: 1200 }}
//           pagination={{
//             pageSize: 10,
//             showSizeChanger: true,
//             showTotal: (total) => `Total ${total} services`,
//             pageSizeOptions: ['10', '20', '50'],
//           }}
//         />
//       </Card>

//       {/* View Details Modal */}
//       <Modal
//         title={
//           <Space>
//             <EyeOutlined style={{ color: '#1890ff' }} />
//             <span>Service Details</span>
//           </Space>
//         }
//         open={viewModalVisible}
//         onCancel={() => setViewModalVisible(false)}
//         footer={[
//           <Button key="close" onClick={() => setViewModalVisible(false)}>
//             Close
//           </Button>,
//           <Button
//             key="edit"
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => {
//               setViewModalVisible(false);
//               handleEdit(selectedService!);
//             }}
//           >
//             Edit Service
//           </Button>,
//         ]}
//         width={900}
//       >
//         {selectedService && (
//           <div>
//             {/* Client Information */}
//             <Card size="small" title="Client Information" style={{ marginBottom: 16 }}>
//               <Row gutter={[16, 16]}>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Client Name
//                   </Text>
//                   <Text strong>{selectedService.clientName}</Text>
//                 </Col>
//                 <Col span={6}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     GST
//                   </Text>
//                   <Tag color="green">{selectedService.gstPercentage}%</Tag>
//                 </Col>
//                 <Col span={6}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Billing Type
//                   </Text>
//                   <Tag color="blue">{selectedService.billingType}</Tag>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Work Address
//                   </Text>
//                   <Text>{selectedService.workAddress}</Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Billing Address
//                   </Text>
//                   <Text>{selectedService.billingAddress}</Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Service Start Date
//                   </Text>
//                   <Text strong>
//                     {dayjs(selectedService.serviceStartDate).format('DD MMMM YYYY')}
//                   </Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Service End Date
//                   </Text>
//                   <Text strong>
//                     {dayjs(selectedService.serviceEndDate).format('DD MMMM YYYY')}
//                   </Text>
//                 </Col>
//               </Row>
//             </Card>

//             {/* Services Details */}
//             <Card size="small" title="Services Provided">
//               {selectedService.services.map((serviceGroup, sgIdx) => (
//                 <Card
//                   key={sgIdx}
//                   type="inner"
//                   size="small"
//                   title={
//                     <Tag color="purple" style={{ fontSize: 14 }}>
//                       {serviceGroup.mainService}
//                     </Tag>
//                   }
//                   style={{ marginBottom: 12 }}
//                 >
//                   {serviceGroup.subServices.map((subService, ssIdx) => {
//                     const completedVisits =
//                       subService.visits?.filter((v) => v.completed).length || 0;
//                     const totalVisits = subService.visits?.length || 0;

//                     return (
//                       <Card
//                         key={ssIdx}
//                         size="small"
//                         style={{ marginBottom: 8, border: '1px solid #e8e8e8' }}
//                       >
//                         <Row gutter={[16, 8]} align="middle">
//                           <Col span={8}>
//                             <Text strong style={{ fontSize: 13 }}>
//                               {subService.subServiceName}
//                             </Text>
//                           </Col>
//                           <Col span={6}>
//                             <Tag color="blue">{subService.frequency}</Tag>
//                           </Col>
//                           <Col span={6}>
//                             <Badge
//                               status={
//                                 completedVisits === totalVisits ? 'success' : 'processing'
//                               }
//                               text={`${completedVisits}/${totalVisits} Visits`}
//                             />
//                           </Col>
//                         </Row>

//                         {subService.visits && subService.visits.length > 0 && (
//                           <div style={{ marginTop: 12 }}>
//                             <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
//                               Visit Schedule:
//                             </Text>
//                             <Row gutter={[8, 8]}>
//                               {subService.visits.slice(0, 4).map((visit, vIdx) => (
//                                 <Col span={12} key={vIdx}>
//                                   <div
//                                     style={{
//                                       padding: '6px 8px',
//                                       background: visit.completed ? '#f6ffed' : '#fafafa',
//                                       border: `1px solid ${
//                                         visit.completed ? '#b7eb8f' : '#d9d9d9'
//                                       }`,
//                                       borderRadius: 4,
//                                       fontSize: 11,
//                                     }}
//                                   >
//                                     <Space size={4}>
//                                       <Badge
//                                         status={visit.completed ? 'success' : 'default'}
//                                       />
//                                       <Text style={{ fontSize: 11 }}>
//                                         Visit {visit.visitNumber}
//                                       </Text>
//                                       {visit.date && (
//                                         <Text type="secondary" style={{ fontSize: 11 }}>
//                                           - {dayjs(visit.date).format('DD/MM/YY')}
//                                         </Text>
//                                       )}
//                                       {visit.person && (
//                                         <Text style={{ fontSize: 11 }}>
//                                           <UserOutlined style={{ fontSize: 10, marginRight: 2 }} />
//                                           {visit.person}
//                                         </Text>
//                                       )}
//                                     </Space>
//                                   </div>
//                                 </Col>
//                               ))}
//                             </Row>
//                             {subService.visits.length > 4 && (
//                               <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: 'block' }}>
//                                 +{subService.visits.length - 4} more visits
//                               </Text>
//                             )}
//                           </div>
//                         )}

//                         {subService.extraServices &&
//                           subService.extraServices.some((e) => e.description || e.date) && (
//                             <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed #d9d9d9' }}>
//                               <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
//                                 Extra Services:
//                               </Text>
//                               {subService.extraServices
//                                 .filter((e) => e.description || e.date)
//                                 .map((extra, eIdx) => (
//                                   <div
//                                     key={eIdx}
//                                     style={{
//                                       padding: '4px 8px',
//                                       background: '#fffbe6',
//                                       border: '1px solid #ffe58f',
//                                       borderRadius: 4,
//                                       fontSize: 11,
//                                       marginBottom: 4,
//                                     }}
//                                   >
//                                     <Space size={4}>
//                                       <Tag color="orange" style={{ fontSize: 10, padding: '0 4px' }}>
//                                         E{eIdx + 1}
//                                       </Tag>
//                                       <Text style={{ fontSize: 11 }}>{extra.description}</Text>
//                                       {extra.date && (
//                                         <Text type="secondary" style={{ fontSize: 11 }}>
//                                           - {dayjs(extra.date).format('DD/MM/YY')}
//                                         </Text>
//                                       )}
//                                       {extra.person && (
//                                         <Text style={{ fontSize: 11 }}>
//                                           <UserOutlined style={{ fontSize: 10, marginRight: 2 }} />
//                                           {extra.person}
//                                         </Text>
//                                       )}
//                                     </Space>
//                                   </div>
//                                 ))}
//                             </div>
//                           )}
//                       </Card>
//                     );
//                   })}
//                 </Card>
//               ))}
//             </Card>
//           </div>
//         )}
//       </Modal>

//       {/* Edit Modal with Visit Tracking */}
//       <Modal
//         title={
//           <Space>
//             <EditOutlined style={{ color: '#1890ff' }} />
//             <span>Edit Service & Update Visits</span>
//           </Space>
//         }
//         open={editModalVisible}
//         onCancel={() => {
//           setEditModalVisible(false);
//           form.resetFields();
//         }}
//         footer={null}
//         width={1200}
//       >
//         <Form form={form} layout="vertical" onFinish={handleUpdate}>
//           <Card size="small" title="Client Information" style={{ marginBottom: 16 }}>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item name="clientName" label="Client Name" rules={[{ required: true }]}>
//                   <Input />
//                 </Form.Item>
//               </Col>

//               <Col span={6}>
//                 <Form.Item name="gstPercentage" label="GST %" rules={[{ required: true }]}>
//                   <InputNumber min={0} max={28} style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>

//               <Col span={6}>
//                 <Form.Item name="billingType" label="Billing Type" rules={[{ required: true }]}>
//                   <Select>
//                     <Select.Option value="service">Service to Service</Select.Option>
//                     <Select.Option value="monthly">Monthly</Select.Option>
//                     <Select.Option value="quarterly">Quarterly</Select.Option>
//                     <Select.Option value="yearly">Yearly</Select.Option>
//                   </Select>
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="serviceStartDate"
//                   label="Start Date"
//                   rules={[{ required: true }]}
//                 >
//                   <DatePicker style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="serviceEndDate"
//                   label="End Date"
//                   rules={[{ required: true }]}
//                 >
//                   <DatePicker style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="workAddress"
//                   label="Work Address"
//                   rules={[{ required: true }]}
//                 >
//                   <Input.TextArea rows={2} />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="billingAddress"
//                   label="Billing Address"
//                   rules={[{ required: true }]}
//                 >
//                   <Input.TextArea rows={2} />
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Card>

//           <Card size="small" title="Services, Visits & Extra Services">
//             <Form.List name="services">
//               {(serviceFields, { add: addService, remove: removeService }) => (
//                 <>
//                   {serviceFields.map(({ key, name: serviceName }) => (
//                     <Card key={key} type="inner" size="small" style={{ marginBottom: 16, backgroundColor: '#fafafa' }}>
//                       <Space align="start" style={{ display: 'flex', marginBottom: 12 }}>
//                         <Form.Item name={[serviceName, 'mainService']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
//                           <Select placeholder="Main Service" style={{ width: 200 }}>
//                             {mainServices.map((ms) => (
//                               <Select.Option key={ms} value={ms}>
//                                 {ms}
//                               </Select.Option>
//                             ))}
//                           </Select>
//                         </Form.Item>
//                         <Button danger size="small" onClick={() => removeService(serviceName)}>
//                           Remove Main Service
//                         </Button>
//                       </Space>

//                       <Form.List name={[serviceName, 'subServices']}>
//                         {(subFields, { add: addSub, remove: removeSub }) => (
//                           <>
//                             {subFields.map(({ key: subKey, name: subName }) => (
//                               <Card
//                                 key={subKey}
//                                 size="small"
//                                 style={{ marginBottom: 12, backgroundColor: '#fff', border: '2px solid #1890ff' }}
//                               >
//                                 {/* Sub Service Header */}
//                                 <Row gutter={8} align="middle" style={{ marginBottom: 12 }}>
//                                   <Col span={7}>
//                                     <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
//                                       Sub Service
//                                     </Text>
//                                     <Form.Item
//                                       name={[subName, 'subServiceName']}
//                                       rules={[{ required: true }]}
//                                       style={{ marginBottom: 0 }}
//                                     >
//                                       <Select placeholder="Sub Service" style={{ width: '100%' }}>
//                                         {subServices.map((ss) => (
//                                           <Select.Option key={ss} value={ss}>
//                                             {ss}
//                                           </Select.Option>
//                                         ))}
//                                       </Select>
//                                     </Form.Item>
//                                   </Col>

//                                   <Col span={5}>
//                                     <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
//                                       Frequency
//                                     </Text>
//                                     <Form.Item
//                                       name={[subName, 'frequency']}
//                                       rules={[{ required: true }]}
//                                       style={{ marginBottom: 0 }}
//                                     >
//                                       <Select placeholder="Frequency" style={{ width: '100%' }}>
//                                         {frequencyOptions.map((freq) => (
//                                           <Select.Option key={freq.value} value={freq.value}>
//                                             {freq.label}
//                                           </Select.Option>
//                                         ))}
//                                       </Select>
//                                     </Form.Item>
//                                   </Col>

//                                   <Col span={4}>
//                                     <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
//                                       Total Visits
//                                     </Text>
//                                     <Form.Item
//                                       name={[subName, 'plannedCount']}
//                                       rules={[{ required: true }]}
//                                       style={{ marginBottom: 0 }}
//                                     >
//                                       <InputNumber min={1} placeholder="Count" style={{ width: '100%' }} />
//                                     </Form.Item>
//                                   </Col>

//                                   <Col span={8} style={{ textAlign: 'right', paddingTop: 22 }}>
//                                     <Button danger size="small" onClick={() => removeSub(subName)}>
//                                       Remove Sub Service
//                                     </Button>
//                                   </Col>
//                                 </Row>

//                                 <Divider style={{ margin: '12px 0' }} />

//                                 {/* VISIT TRACKING SECTION */}
//                                 <div style={{ marginBottom: 16 }}>
//                                   <div style={{ backgroundColor: '#e6f7ff', padding: '8px 12px', borderRadius: 4, marginBottom: 12 }}>
//                                     <CalendarOutlined style={{ marginRight: 8 }} />
//                                     <Text strong style={{ fontSize: 14 }}>Update Visit Tracking</Text>
//                                   </div>

//                                   <Form.List name={[subName, 'visits']}>
//                                     {(visitFields) => (
//                                       <Row gutter={[8, 8]}>
//                                         {visitFields.map(({ key: visitKey, name: visitName }, visitIndex) => {
//                                           const currentDate = form.getFieldValue(['services', serviceName, 'subServices', subName, 'visits', visitName, 'date']);
//                                           const currentPerson = form.getFieldValue(['services', serviceName, 'subServices', subName, 'visits', visitName, 'person']);
//                                           const isCompleted = !!(currentDate && currentPerson);

//                                           return (
//                                             <Col span={12} key={visitKey}>
//                                               <Card
//                                                 size="small"
//                                                 style={{
//                                                   border: isCompleted ? '2px solid #52c41a' : '1px solid #d9d9d9',
//                                                   backgroundColor: isCompleted ? '#f6ffed' : '#fafafa',
//                                                 }}
//                                               >
//                                                 <Row gutter={8} align="middle">
//                                                   <Col span={3}>
//                                                     <div
//                                                       style={{
//                                                         width: 36,
//                                                         height: 36,
//                                                         borderRadius: '6px',
//                                                         backgroundColor: isCompleted ? '#52c41a' : '#d9d9d9',
//                                                         display: 'flex',
//                                                         alignItems: 'center',
//                                                         justifyContent: 'center',
//                                                         color: '#fff',
//                                                         fontWeight: 'bold',
//                                                         fontSize: 14,
//                                                       }}
//                                                     >
//                                                       {visitIndex + 1}
//                                                     </div>
//                                                   </Col>

//                                                   <Col span={10}>
//                                                     <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                                       Visit Date
//                                                     </Text>
//                                                     <Form.Item
//                                                       name={[visitName, 'date']}
//                                                       style={{ marginBottom: 0 }}
//                                                     >
//                                                       <DatePicker
//                                                         style={{ width: '100%' }}
//                                                         placeholder="Select date"
//                                                         size="small"
//                                                         format="DD-MM-YYYY"
//                                                       />
//                                                     </Form.Item>
//                                                   </Col>

//                                                   <Col span={9}>
//                                                     <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                                       Person Name
//                                                     </Text>
//                                                     <Form.Item
//                                                       name={[visitName, 'person']}
//                                                       style={{ marginBottom: 0 }}
//                                                     >
//                                                       <Input
//                                                         placeholder="Person"
//                                                         prefix={<UserOutlined style={{ fontSize: 12 }} />}
//                                                         size="small"
//                                                       />
//                                                     </Form.Item>
//                                                   </Col>

//                                                   <Col span={2} style={{ textAlign: 'center' }}>
//                                                     {isCompleted ? (
//                                                       <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
//                                                     ) : (
//                                                       <CloseCircleOutlined style={{ fontSize: 20, color: '#d9d9d9' }} />
//                                                     )}
//                                                   </Col>

//                                                   <Form.Item
//                                                     name={[visitName, 'visitNumber']}
//                                                     hidden
//                                                     initialValue={visitIndex + 1}
//                                                   >
//                                                     <Input type="hidden" />
//                                                   </Form.Item>
//                                                 </Row>
//                                               </Card>
//                                             </Col>
//                                           );
//                                         })}
//                                       </Row>
//                                     )}
//                                   </Form.List>
//                                 </div>

//                                 {/* EXTRA SERVICES SECTION */}
//                                 <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fffbe6', borderRadius: 6 }}>
//                                   <div style={{ marginBottom: 12 }}>
//                                     <Text strong style={{ fontSize: 14 }}>Update Extra Services</Text>
//                                     <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>
//                                       - Add or update additional services
//                                     </Text>
//                                   </div>

//                                   <Form.List name={[subName, 'extraServices']}>
//                                     {(extraFields, { add: addExtra, remove: removeExtra }) => (
//                                       <>
//                                         {extraFields.map(({ key: extraKey, name: extraName }, extraIndex) => {
//                                           const currentDesc = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'description']);
//                                           const currentExtraDate = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'date']);
//                                           const currentExtraPerson = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'person']);
//                                           const isExtraComplete = !!(currentDesc && currentExtraDate && currentExtraPerson);

//                                           return (
//                                             <Card
//                                               key={extraKey}
//                                               size="small"
//                                               style={{ marginBottom: 8, backgroundColor: '#fff' }}
//                                             >
//                                               <Row gutter={8} align="middle">
//                                                 <Col span={2}>
//                                                   <div
//                                                     style={{
//                                                       width: 32,
//                                                       height: 32,
//                                                       borderRadius: '6px',
//                                                       backgroundColor: isExtraComplete ? '#faad14' : '#d9d9d9',
//                                                       display: 'flex',
//                                                       alignItems: 'center',
//                                                       justifyContent: 'center',
//                                                       color: '#fff',
//                                                       fontWeight: 'bold',
//                                                       fontSize: 13,
//                                                     }}
//                                                   >
//                                                     E{extraIndex + 1}
//                                                   </div>
//                                                 </Col>

//                                                 <Col span={8}>
//                                                   <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                                     Service Description
//                                                   </Text>
//                                                   <Form.Item
//                                                     name={[extraName, 'description']}
//                                                     style={{ marginBottom: 0 }}
//                                                   >
//                                                     <Input
//                                                       placeholder={`Extra service ${extraIndex + 1} description`}
//                                                       size="small"
//                                                     />
//                                                   </Form.Item>
//                                                 </Col>

//                                                 <Col span={5}>
//                                                   <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                                     Date
//                                                   </Text>
//                                                   <Form.Item
//                                                     name={[extraName, 'date']}
//                                                     style={{ marginBottom: 0 }}
//                                                   >
//                                                     <DatePicker
//                                                       placeholder="Date"
//                                                       style={{ width: '100%' }}
//                                                       size="small"
//                                                       format="DD-MM-YYYY"
//                                                     />
//                                                   </Form.Item>
//                                                 </Col>

//                                                 <Col span={6}>
//                                                   <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                                     Person Name
//                                                   </Text>
//                                                   <Form.Item
//                                                     name={[extraName, 'person']}
//                                                     style={{ marginBottom: 0 }}
//                                                   >
//                                                     <Input
//                                                       placeholder="Person name"
//                                                       size="small"
//                                                       prefix={<UserOutlined style={{ fontSize: 12 }} />}
//                                                     />
//                                                   </Form.Item>
//                                                 </Col>

//                                                 <Col span={3} style={{ textAlign: 'center' }}>
//                                                   {isExtraComplete ? (
//                                                     <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
//                                                   ) : (
//                                                     <Button
//                                                       danger
//                                                       size="small"
//                                                       type="text"
//                                                       onClick={() => removeExtra(extraName)}
//                                                       icon={<DeleteOutlined />}
//                                                     />
//                                                   )}
//                                                 </Col>
//                                               </Row>
//                                             </Card>
//                                           );
//                                         })}

//                                         <Button
//                                           type="dashed"
//                                           size="small"
//                                           onClick={() => addExtra()}
//                                           icon={<PlusOutlined />}
//                                           style={{ marginTop: 4 }}
//                                         >
//                                           Add Extra Service
//                                         </Button>
//                                       </>
//                                     )}
//                                   </Form.List>
//                                 </div>
//                               </Card>
//                             ))}

//                             <Button
//                               type="dashed"
//                               size="small"
//                               onClick={() => addSub()}
//                               icon={<PlusOutlined />}
//                               style={{ marginTop: 8 }}
//                             >
//                               Add Sub Service
//                             </Button>
//                           </>
//                         )}
//                       </Form.List>
//                     </Card>
//                   ))}

//                   <Button
//                     type="dashed"
//                     onClick={() => addService()}
//                     icon={<PlusOutlined />}
//                     size="large"
//                   >
//                     Add Main Service
//                   </Button>
//                 </>
//               )}
//             </Form.List>
//           </Card>

//           <Form.Item style={{ marginTop: 16, marginBottom: 0 }}>
//             <Row justify="end">
//               <Space size={8}>
//                 <Button onClick={() => setEditModalVisible(false)} size="large">
//                   Cancel
//                 </Button>
//                 <Button type="primary" htmlType="submit" loading={isUpdating} size="large" icon={<EditOutlined />}>
//                   {isUpdating ? 'Updating...' : 'Update Service & Visits'}
//                 </Button>
//               </Space>
//             </Row>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ServiceManagement;





// import { useState, useRef } from 'react';
// import {
//   Button,
//   Table,
//   Space,
//   Modal,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   DatePicker,
//   Card,
//   Popconfirm,
//   Tag,
//   Row,
//   Col,
//   Typography,
//   Divider,
//   Badge,
//   Tooltip,
// } from 'antd';
// import {
//   DeleteOutlined,
//   EditOutlined,
//   DownloadOutlined,
//   PlusOutlined,
//   EyeOutlined,
//   CalendarOutlined,
//   UserOutlined,
//   FileTextOutlined,
// } from '@ant-design/icons';
// import type { ColumnsType } from 'antd/es/table';
// import dayjs from 'dayjs';
// import * as XLSX from 'xlsx';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import {
//   useGetAllServicesQuery,
//   useDeleteServiceMutation,
//   useUpdateServiceMutation,
// } from '../../redux/features/management/serviceApi';
// import toastMessage from '../../lib/toastMessage';

// const { Title, Text } = Typography;

// interface Visit {
//   visitNumber: number;
//   date: string | null;
//   person: string;
//   completed: boolean;
// }

// interface ExtraService {
//   description: string;
//   date: string | null;
//   person: string;
// }

// interface SubService {
//   subServiceName: string;
//   frequency: string;
//   plannedCount: number;
//   visits: Visit[];
//   extraServices: ExtraService[];
// }

// interface ServiceGroup {
//   mainService: string;
//   subServices: SubService[];
// }

// interface Service {
//   _id: string;
//   clientName: string;
//   gstPercentage: number;
//   billingType: string;
//   billingAddress: string;
//   workAddress: string;
//   serviceStartDate: string;
//   serviceEndDate: string;
//   services: ServiceGroup[];
//   createdAt: string;
// }

// const mainServices = [
//   'AMC',
//   'Deep Cleaning',
//   'Bathroom Cleaning',
//   'Kitchen Cleaning',
//   'Pest Control',
// ];

// const subServices = [
//   'Rodent Control',
//   'Mosquito Control',
//   'Termite Control',
//   'General Pest Control',
//   'Snake Control',
// ];

// const frequencyOptions = [
//   { label: 'Daily', value: 'daily', count: 30 },
//   { label: 'Weekly Once', value: 'weekly_once', count: 4 },
//   { label: 'Weekly Twice', value: 'weekly_twice', count: 8 },
//   { label: 'Weekly Thrice', value: 'weekly_thrice', count: 12 },
//   { label: 'Monthly Once', value: 'monthly_once', count: 1 },
//   { label: 'Quarterly Once', value: 'quarterly_once', count: 4 },
//   { label: 'Yearly Once', value: 'yearly_once', count: 1 },
// ];

// const ServiceManagement = () => {
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [form] = Form.useForm();

//   // ref for the view modal content that we will capture
//   const printRef = useRef<HTMLDivElement | null>(null);

//   const { data: servicesData, isLoading } = useGetAllServicesQuery(undefined);
//   const [deleteService] = useDeleteServiceMutation();
//   const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

//   const services = servicesData?.data || [];

//   // Calculate statistics
//   const calculateServiceStats = (service: Service) => {
//     let totalVisits = 0;
//     let completedVisits = 0;
//     let totalExtra = 0;

//     service.services.forEach((sg) => {
//       sg.subServices.forEach((ss) => {
//         totalVisits += ss.visits?.length || 0;
//         completedVisits += ss.visits?.filter((v) => v.completed).length || 0;
//         totalExtra += ss.extraServices?.filter((e) => e.description && e.date).length || 0;
//       });
//     });

//     return { totalVisits, completedVisits, totalExtra };
//   };

//   const handleView = (record: Service) => {
//     setSelectedService(record);
//     setViewModalVisible(true);
//     // leave modal open and content will be captured from printRef
//   };

//   const handleEdit = (record: Service) => {
//     setSelectedService(record);

//     // Transform the data to include dayjs objects for dates
//     const transformedServices = record.services.map(service => ({
//       ...service,
//       subServices: service.subServices.map(subService => ({
//         ...subService,
//         visits: subService.visits?.map(visit => ({
//           ...visit,
//           date: visit.date ? dayjs(visit.date) : null,
//         })) || [],
//         extraServices: subService.extraServices?.map(extra => ({
//           ...extra,
//           date: extra.date ? dayjs(extra.date) : null,
//         })) || [],
//       })),
//     }));

//     form.setFieldsValue({
//       ...record,
//       serviceStartDate: dayjs(record.serviceStartDate),
//       serviceEndDate: dayjs(record.serviceEndDate),
//       services: transformedServices,
//     });
//     setEditModalVisible(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await deleteService(id).unwrap();
//       toastMessage({ icon: 'success', text: res.message || 'Service deleted successfully' });
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to delete service' });
//     }
//   };

//   const handleUpdate = async (values: any) => {
//     try {
//       // Transform the data back to ISO strings
//       const transformedServices = values.services.map((service: any) => ({
//         ...service,
//         subServices: service.subServices.map((subService: any) => ({
//           ...subService,
//           visits: subService.visits?.map((visit: any) => ({
//             ...visit,
//             date: visit.date ? visit.date.toISOString() : null,
//             completed: !!(visit.date && visit.person),
//           })) || [],
//           extraServices: subService.extraServices?.map((extra: any) => ({
//             ...extra,
//             date: extra.date ? extra.date.toISOString() : null,
//           })).filter((e: any) => e.description || e.date || e.person) || [],
//         })),
//       }));

//       const payload = {
//         ...values,
//         serviceStartDate: values.serviceStartDate?.toISOString(),
//         serviceEndDate: values.serviceEndDate?.toISOString(),
//         services: transformedServices,
//       };

//       const res = await updateService({
//         id: selectedService?._id,
//         data: payload,
//       }).unwrap();

//       if (res.statusCode === 200) {
//         toastMessage({ icon: 'success', text: res.message || 'Service updated successfully' });
//         setEditModalVisible(false);
//         form.resetFields();
//       }
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to update service' });
//     }
//   };

//   const handleDownloadExcel = () => {
//     const exportData = services.map((service: Service) => {
//       const stats = calculateServiceStats(service);
//       return {
//         'Client Name': service.clientName,
//         'GST %': service.gstPercentage,
//         'Billing Type': service.billingType,
//         'Work Address': service.workAddress,
//         'Billing Address': service.billingAddress,
//         'Start Date': dayjs(service.serviceStartDate).format('DD/MM/YYYY'),
//         'End Date': dayjs(service.serviceEndDate).format('DD/MM/YYYY'),
//         'Main Services': service.services.map((s) => s.mainService).join(', '),
//         'Total Visits': stats.totalVisits,
//         'Completed Visits': stats.completedVisits,
//         'Extra Services': stats.totalExtra,
//         'Created At': dayjs(service.createdAt).format('DD/MM/YYYY HH:mm'),
//       };
//     });

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Services');
//     XLSX.writeFile(wb, `services_${dayjs().format('YYYY-MM-DD')}.xlsx`);
//     toastMessage({ icon: 'success', text: 'Excel downloaded successfully' });
//   };

//   // PDF / Image export of the "Service Details" view
//   const handleExportPDF = async () => {
//     if (!printRef.current || !selectedService) {
//       toastMessage({ icon: 'error', text: 'Nothing to export' });
//       return;
//     }

//     try {
//       // Slight delay to ensure fonts/images in modal are fully rendered
//       await new Promise((res) => setTimeout(res, 300));

//       // Use html2canvas to capture the ref node
//       const canvas = await html2canvas(printRef.current, {
//         scale: 2, // increase resolution
//         useCORS: true,
//         allowTaint: true,
//         logging: false,
//       });

//       const imgData = canvas.toDataURL('image/png');

//       // Create PDF (A4 landscape) and add the image
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'pt',
//         format: 'a4',
//       });

//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();

//       const imgProps = (pdf as any).getImageProperties(imgData);
//       const imgWidth = pageWidth;
//       const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

//       if (imgHeight <= pageHeight) {
//         pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       } else {
//         // If content taller than a single page, split into multiple pages
//         // We will draw the image multiple times, shifting the source y offset by pageHeight ratio.
//         // Simpler approach: scale by width then slice by canvas to multiple pages
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;
//         const ratio = canvasWidth / pageWidth;
//         const pageCanvasHeight = Math.floor(pageHeight * ratio);

//         let remainingHeight = canvasHeight;
//         let position = 0;

//         while (remainingHeight > 0) {
//           const page = document.createElement('canvas');
//           page.width = canvasWidth;
//           page.height = Math.min(pageCanvasHeight, remainingHeight);

//           const ctx = page.getContext('2d')!;
//           // draw portion from the original canvas
//           ctx.drawImage(
//             canvas,
//             0,
//             position,
//             canvasWidth,
//             page.height,
//             0,
//             0,
//             canvasWidth,
//             page.height
//           );

//           const pageData = page.toDataURL('image/png');
//           const pageImgHeight = (page.height / ratio);

//           if (pdf.getNumberOfPages() > 0) pdf.addPage();
//           pdf.addImage(pageData, 'PNG', 0, 0, pageWidth, pageImgHeight);

//           position += page.height;
//           remainingHeight -= page.height;
//         }
//       }

//       const fileName = `service_${selectedService.clientName.replace(/\s+/g, '_')}_${dayjs().format('YYYY-MM-DD')}.pdf`;
//       pdf.save(fileName);
//       toastMessage({ icon: 'success', text: 'PDF downloaded successfully' });
//     } catch (err) {
//       console.error('Export PDF error', err);
//       toastMessage({ icon: 'error', text: 'Failed to export PDF' });
//     }
//   };

//   const columns: ColumnsType<Service> = [
//     {
//       title: 'Client Details',
//       key: 'clientDetails',
//       width: 250,
//       render: (_, record) => (
//         <div>
//           <Text strong style={{ display: 'block', fontSize: 14 }}>
//             {record.clientName}
//           </Text>
//           <Space size={4} style={{ marginTop: 4 }}>
//             <Tag color="blue">{record.billingType}</Tag>
//             <Tag color="green">{record.gstPercentage}% GST</Tag>
//           </Space>
//         </div>
//       ),
//     },
//     {
//       title: 'Service Period',
//       key: 'period',
//       width: 180,
//       render: (_, record) => (
//         <div>
//           <div style={{ marginBottom: 4 }}>
//             <CalendarOutlined style={{ marginRight: 4, color: '#1890ff' }} />
//             <Text style={{ fontSize: 12 }}>
//               {dayjs(record.serviceStartDate).format('DD MMM YYYY')}
//             </Text>
//           </div>
//           <div>
//             <CalendarOutlined style={{ marginRight: 4, color: '#52c41a' }} />
//             <Text style={{ fontSize: 12 }}>
//               {dayjs(record.serviceEndDate).format('DD MMM YYYY')}
//             </Text>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Services',
//       key: 'services',
//       width: 200,
//       render: (_, record) => (
//         <Space direction="vertical" size={4}>
//           {record.services.slice(0, 2).map((s, idx) => (
//             <Tag key={idx} color="purple">
//               {s.mainService}
//             </Tag>
//           ))}
//           {record.services.length > 2 && (
//             <Tag color="default">+{record.services.length - 2} more</Tag>
//           )}
//         </Space>
//       ),
//     },
//     {
//       title: 'Progress',
//       key: 'progress',
//       width: 150,
//       render: (_, record) => {
//         const stats = calculateServiceStats(record);
//         const percentage =
//           stats.totalVisits > 0
//             ? Math.round((stats.completedVisits / stats.totalVisits) * 100)
//             : 0;

//         return (
//           <Space direction="vertical" size={4}>
//             <div>
//               <Badge
//                 status={percentage === 100 ? 'success' : 'processing'}
//                 text={
//                   <Text style={{ fontSize: 12 }}>
//                     {stats.completedVisits}/{stats.totalVisits} Visits
//                   </Text>
//                 }
//               />
//             </div>
//             {stats.totalExtra > 0 && (
//               <Text type="secondary" style={{ fontSize: 11 }}>
//                 +{stats.totalExtra} Extra
//               </Text>
//             )}
//           </Space>
//         );
//       },
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 180,
//       fixed: 'right',
//       render: (_, record) => (
//         <Space size={4}>
//           <Tooltip title="View Details">
//             <Button
//               type="default"
//               icon={<EyeOutlined />}
//               size="small"
//               onClick={() => handleView(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Edit">
//             <Button
//               type="primary"
//               icon={<EditOutlined />}
//               size="small"
//               onClick={() => handleEdit(record)}
//             />
//           </Tooltip>
//           <Popconfirm
//             title="Delete Service"
//             description="Are you sure you want to delete this service?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Tooltip title="Delete">
//               <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
//             </Tooltip>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
//       <Card bordered={false} style={{ marginBottom: 16 }}>
//         <Row justify="space-between" align="middle">
//           <Col>
//             <Title level={3} style={{ margin: 0 }}>
//               <FileTextOutlined style={{ marginRight: 12, color: '#1890ff' }} />
//               Service Management
//             </Title>
//             <Text type="secondary">
//               Manage and track all service contracts and visits
//             </Text>
//           </Col>
//           <Col>
//             <Space size={8}>
//               <Button
//                 icon={<DownloadOutlined />}
//                 onClick={handleDownloadExcel}
//                 disabled={services.length === 0}
//                 size="large"
//               >
//                 Export Excel
//               </Button>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => (window.location.href = '/services/create')}
//                 size="large"
//               >
//                 Add New Service
//               </Button>
//             </Space>
//           </Col>
//         </Row>
//       </Card>

//       <Card bordered={false}>
//         <Table
//           columns={columns}
//           dataSource={services}
//           rowKey="_id"
//           loading={isLoading}
//           scroll={{ x: 1200 }}
//           pagination={{
//             pageSize: 10,
//             showSizeChanger: true,
//             showTotal: (total) => `Total ${total} services`,
//             pageSizeOptions: ['10', '20', '50'],
//           }}
//         />
//       </Card>

//       {/* View Details Modal */}
//       <Modal
//         title={
//           <Space>
//             <EyeOutlined style={{ color: '#1890ff' }} />
//             <span>Service Details</span>
//           </Space>
//         }
//         open={viewModalVisible}
//         onCancel={() => setViewModalVisible(false)}
//         footer={[
//           <Button key="close" onClick={() => setViewModalVisible(false)}>
//             Close
//           </Button>,
//           <Button
//             key="export"
//             icon={<DownloadOutlined />}
//             onClick={handleExportPDF}
//           >
//             Download as PDF
//           </Button>,
//           <Button
//             key="edit"
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => {
//               setViewModalVisible(false);
//               if (selectedService) handleEdit(selectedService);
//             }}
//           >
//             Edit Service
//           </Button>,
//         ]}
//         width={900}
//       >
//         {selectedService && (
//           // Wrap the content inside a container ref that will be captured by html2canvas
//           <div ref={printRef} style={{ background: '#ffffff', padding: 16 }}>
//             {/* Client Information */}
//             <Card size="small" title="Client Information" style={{ marginBottom: 16 }}>
//               <Row gutter={[16, 16]}>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Client Name
//                   </Text>
//                   <Text strong>{selectedService.clientName}</Text>
//                 </Col>
//                 <Col span={6}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     GST
//                   </Text>
//                   <Tag color="green">{selectedService.gstPercentage}%</Tag>
//                 </Col>
//                 <Col span={6}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Billing Type
//                   </Text>
//                   <Tag color="blue">{selectedService.billingType}</Tag>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Work Address
//                   </Text>
//                   <Text>{selectedService.workAddress}</Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Billing Address
//                   </Text>
//                   <Text>{selectedService.billingAddress}</Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Service Start Date
//                   </Text>
//                   <Text strong>
//                     {dayjs(selectedService.serviceStartDate).format('DD MMMM YYYY')}
//                   </Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Service End Date
//                   </Text>
//                   <Text strong>
//                     {dayjs(selectedService.serviceEndDate).format('DD MMMM YYYY')}
//                   </Text>
//                 </Col>
//               </Row>
//             </Card>

//             {/* Services Details */}
//             <Card size="small" title="Services Provided">
//               {selectedService.services.map((serviceGroup, sgIdx) => (
//                 <Card
//                   key={sgIdx}
//                   type="inner"
//                   size="small"
//                   title={
//                     <Tag color="purple" style={{ fontSize: 14 }}>
//                       {serviceGroup.mainService}
//                     </Tag>
//                   }
//                   style={{ marginBottom: 12 }}
//                 >
//                   {serviceGroup.subServices.map((subService, ssIdx) => {
//                     const completedVisits =
//                       subService.visits?.filter((v) => v.completed).length || 0;
//                     const totalVisits = subService.visits?.length || 0;

//                     return (
//                       <Card
//                         key={ssIdx}
//                         size="small"
//                         style={{ marginBottom: 8, border: '1px solid #e8e8e8' }}
//                       >
//                         <Row gutter={[16, 8]} align="middle">
//                           <Col span={8}>
//                             <Text strong style={{ fontSize: 13 }}>
//                               {subService.subServiceName}
//                             </Text>
//                           </Col>
//                           <Col span={6}>
//                             <Tag color="blue">{subService.frequency}</Tag>
//                           </Col>
//                           <Col span={6}>
//                             <Badge
//                               status={
//                                 completedVisits === totalVisits ? 'success' : 'processing'
//                               }
//                               text={`${completedVisits}/${totalVisits} Visits`}
//                             />
//                           </Col>
//                         </Row>

//                         {subService.visits && subService.visits.length > 0 && (
//                           <div style={{ marginTop: 12 }}>
//                             <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
//                               Visit Schedule:
//                             </Text>
//                             <Row gutter={[8, 8]}>
//                               {subService.visits.slice(0, 4).map((visit, vIdx) => (
//                                 <Col span={12} key={vIdx}>
//                                   <div
//                                     style={{
//                                       padding: '6px 8px',
//                                       background: visit.completed ? '#f6ffed' : '#fafafa',
//                                       border: `1px solid ${
//                                         visit.completed ? '#b7eb8f' : '#d9d9d9'
//                                       }`,
//                                       borderRadius: 4,
//                                       fontSize: 11,
//                                     }}
//                                   >
//                                     <Space size={4}>
//                                       <Badge
//                                         status={visit.completed ? 'success' : 'default'}
//                                       />
//                                       <Text style={{ fontSize: 11 }}>
//                                         Visit {visit.visitNumber}
//                                       </Text>
//                                       {visit.date && (
//                                         <Text type="secondary" style={{ fontSize: 11 }}>
//                                           - {dayjs(visit.date).format('DD/MM/YY')}
//                                         </Text>
//                                       )}
//                                       {visit.person && (
//                                         <Text style={{ fontSize: 11 }}>
//                                           <UserOutlined style={{ fontSize: 10, marginRight: 2 }} />
//                                           {visit.person}
//                                         </Text>
//                                       )}
//                                     </Space>
//                                   </div>
//                                 </Col>
//                               ))}
//                             </Row>
//                             {subService.visits.length > 4 && (
//                               <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: 'block' }}>
//                                 +{subService.visits.length - 4} more visits
//                               </Text>
//                             )}
//                           </div>
//                         )}

//                         {subService.extraServices &&
//                           subService.extraServices.some((e) => e.description || e.date) && (
//                             <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed #d9d9d9' }}>
//                               <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
//                                 Extra Services:
//                               </Text>
//                               {subService.extraServices
//                                 .filter((e) => e.description || e.date)
//                                 .map((extra, eIdx) => (
//                                   <div
//                                     key={eIdx}
//                                     style={{
//                                       padding: '4px 8px',
//                                       background: '#fffbe6',
//                                       border: '1px solid #ffe58f',
//                                       borderRadius: 4,
//                                       fontSize: 11,
//                                       marginBottom: 4,
//                                     }}
//                                   >
//                                     <Space size={4}>
//                                       <Tag color="orange" style={{ fontSize: 10, padding: '0 4px' }}>
//                                         E{eIdx + 1}
//                                       </Tag>
//                                       <Text style={{ fontSize: 11 }}>{extra.description}</Text>
//                                       {extra.date && (
//                                         <Text type="secondary" style={{ fontSize: 11 }}>
//                                           - {dayjs(extra.date).format('DD/MM/YY')}
//                                         </Text>
//                                       )}
//                                       {extra.person && (
//                                         <Text style={{ fontSize: 11 }}>
//                                           <UserOutlined style={{ fontSize: 10, marginRight: 2 }} />
//                                           {extra.person}
//                                         </Text>
//                                       )}
//                                     </Space>
//                                   </div>
//                                 ))}
//                             </div>
//                           )}
//                       </Card>
//                     );
//                   })}
//                 </Card>
//               ))}
//             </Card>
//           </div>
//         )}
//       </Modal>

//       {/* Edit Modal with Visit Tracking (unchanged) */}
//       <Modal
//         title={
//           <Space>
//             <EditOutlined style={{ color: '#1890ff' }} />
//             <span>Edit Service & Update Visits</span>
//           </Space>
//         }
//         open={editModalVisible}
//         onCancel={() => {
//           setEditModalVisible(false);
//           form.resetFields();
//         }}
//         footer={null}
//         width={1200}
//       >
//         <Form form={form} layout="vertical" onFinish={handleUpdate}>
//           <Card size="small" title="Client Information" style={{ marginBottom: 16 }}>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item name="clientName" label="Client Name" rules={[{ required: true }]}>
//                   <Input />
//                 </Form.Item>
//               </Col>

//               <Col span={6}>
//                 <Form.Item name="gstPercentage" label="GST %" rules={[{ required: true }]}>
//                   <InputNumber min={0} max={28} style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>

//               <Col span={6}>
//                 <Form.Item name="billingType" label="Billing Type" rules={[{ required: true }]}>
//                   <Select>
//                     <Select.Option value="service">Service to Service</Select.Option>
//                     <Select.Option value="monthly">Monthly</Select.Option>
//                     <Select.Option value="quarterly">Quarterly</Select.Option>
//                     <Select.Option value="yearly">Yearly</Select.Option>
//                   </Select>
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="serviceStartDate"
//                   label="Start Date"
//                   rules={[{ required: true }]}
//                 >
//                   <DatePicker style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="serviceEndDate"
//                   label="End Date"
//                   rules={[{ required: true }]}
//                 >
//                   <DatePicker style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="workAddress"
//                   label="Work Address"
//                   rules={[{ required: true }]}
//                 >
//                   <Input.TextArea rows={2} />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="billingAddress"
//                   label="Billing Address"
//                   rules={[{ required: true }]}
//                 >
//                   <Input.TextArea rows={2} />
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Card>

//           <Card size="small" title="Services, Visits & Extra Services">
//             <Form.List name="services">
//               {(serviceFields, { add: addService, remove: removeService }) => (
//                 <>
//                   {serviceFields.map(({ key, name: serviceName }) => (
//                     <Card key={key} type="inner" size="small" style={{ marginBottom: 16, backgroundColor: '#fafafa' }}>
//                       <Space align="start" style={{ display: 'flex', marginBottom: 12 }}>
//                         <Form.Item name={[serviceName, 'mainService']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
//                           <Select placeholder="Main Service" style={{ width: 200 }}>
//                             {mainServices.map((ms) => (
//                               <Select.Option key={ms} value={ms}>
//                                 {ms}
//                               </Select.Option>
//                             ))}
//                           </Select>
//                         </Form.Item>
//                         <Button danger size="small" onClick={() => removeService(serviceName)}>
//                           Remove Main Service
//                         </Button>
//                       </Space>

//                       <Form.List name={[serviceName, 'subServices']}>
//                         {(subFields, { add: addSub, remove: removeSub }) => (
//                           <>
//                             {subFields.map(({ key: subKey, name: subName }) => (
//                               <Card
//                                 key={subKey}
//                                 size="small"
//                                 style={{ marginBottom: 12, backgroundColor: '#fff', border: '2px solid #1890ff' }}
//                               >
//                                 {/* Sub Service Header */}
//                                 <Row gutter={8} align="middle" style={{ marginBottom: 12 }}>
//                                   <Col span={7}>
//                                     <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
//                                       Sub Service
//                                     </Text>
//                                     <Form.Item
//                                       name={[subName, 'subServiceName']}
//                                       rules={[{ required: true }]}
//                                       style={{ marginBottom: 0 }}
//                                     >
//                                       <Select placeholder="Sub Service" style={{ width: '100%' }}>
//                                         {subServices.map((ss) => (
//                                           <Select.Option key={ss} value={ss}>
//                                             {ss}
//                                           </Select.Option>
//                                         ))}
//                                       </Select>
//                                     </Form.Item>
//                                   </Col>

//                                   <Col span={5}>
//                                     <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
//                                       Frequency
//                                     </Text>
//                                     <Form.Item
//                                       name={[subName, 'frequency']}
//                                       rules={[{ required: true }]}
//                                       style={{ marginBottom: 0 }}
//                                     >
//                                       <Select placeholder="Frequency" style={{ width: '100%' }}>
//                                         {frequencyOptions.map((freq) => (
//                                           <Select.Option key={freq.value} value={freq.value}>
//                                             {freq.label}
//                                           </Select.Option>
//                                         ))}
//                                       </Select>
//                                     </Form.Item>
//                                   </Col>

//                                   <Col span={4}>
//                                     <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
//                                       Total Visits
//                                     </Text>
//                                     <Form.Item
//                                       name={[subName, 'plannedCount']}
//                                       rules={[{ required: true }]}
//                                       style={{ marginBottom: 0 }}
//                                     >
//                                       <InputNumber min={1} placeholder="Count" style={{ width: '100%' }} />
//                                     </Form.Item>
//                                   </Col>

//                                   <Col span={8} style={{ textAlign: 'right', paddingTop: 22 }}>
//                                     <Button danger size="small" onClick={() => removeSub(subName)}>
//                                       Remove Sub Service
//                                     </Button>
//                                   </Col>
//                                 </Row>

//                                 <Divider style={{ margin: '12px 0' }} />

//                                 {/* VISIT TRACKING SECTION */}
//                                 <div style={{ marginBottom: 16 }}>
//                                   <div style={{ backgroundColor: '#e6f7ff', padding: '8px 12px', borderRadius: 4, marginBottom: 12 }}>
//                                     <CalendarOutlined style={{ marginRight: 8 }} />
//                                     <Text strong style={{ fontSize: 14 }}>Update Visit Tracking</Text>
//                                   </div>

//                                   <Form.List name={[subName, 'visits']}>
//                                     {(visitFields) => (
//                                       <Row gutter={[8, 8]}>
//                                         {visitFields.map(({ key: visitKey, name: visitName }, visitIndex) => {
//                                           const currentDate = form.getFieldValue(['services', serviceName, 'subServices', subName, 'visits', visitName, 'date']);
//                                           const currentPerson = form.getFieldValue(['services', serviceName, 'subServices', subName, 'visits', visitName, 'person']);
//                                           const isCompleted = !!(currentDate && currentPerson);

//                                           return (
//                                             <Col span={12} key={visitKey}>
//                                               <Card
//                                                 size="small"
//                                                 style={{
//                                                   border: isCompleted ? '2px solid #52c41a' : '1px solid #d9d9d9',
//                                                   backgroundColor: isCompleted ? '#f6ffed' : '#fafafa',
//                                                 }}
//                                               >
//                                                 <Row gutter={8} align="middle">
//                                                   <Col span={3}>
//                                                     <div
//                                                       style={{
//                                                         width: 36,
//                                                         height: 36,
//                                                         borderRadius: '6px',
//                                                         backgroundColor: isCompleted ? '#52c41a' : '#d9d9d9',
//                                                         display: 'flex',
//                                                         alignItems: 'center',
//                                                         justifyContent: 'center',
//                                                         color: '#fff',
//                                                         fontWeight: 'bold',
//                                                         fontSize: 14,
//                                                       }}
//                                                     >
//                                                       {visitIndex + 1}
//                                                     </div>
//                                                   </Col>

//                                                   <Col span={10}>
//                                                     <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                                       Visit Date
//                                                     </Text>
//                                                     <Form.Item
//                                                       name={[visitName, 'date']}
//                                                       style={{ marginBottom: 0 }}
//                                                     >
//                                                       <DatePicker
//                                                         style={{ width: '100%' }}
//                                                         placeholder="Select date"
//                                                         size="small"
//                                                         format="DD-MM-YYYY"
//                                                       />
//                                                     </Form.Item>
//                                                   </Col>

//                                                   <Col span={9}>
//                                                     <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                                       Person Name
//                                                     </Text>
//                                                     <Form.Item
//                                                       name={[visitName, 'person']}
//                                                       style={{ marginBottom: 0 }}
//                                                     >
//                                                       <Input
//                                                         placeholder="Person"
//                                                         prefix={<UserOutlined style={{ fontSize: 12 }} />}
//                                                         size="small"
//                                                       />
//                                                     </Form.Item>
//                                                   </Col>

//                                                   <Col span={2} style={{ textAlign: 'center' }}>
//                                                     {isCompleted ? (
//                                                       <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
//                                                     ) : (
//                                                       <CloseCircleOutlined style={{ fontSize: 20, color: '#d9d9d9' }} />
//                                                     )}
//                                                   </Col>

//                                                   <Form.Item
//                                                     name={[visitName, 'visitNumber']}
//                                                     hidden
//                                                     initialValue={visitIndex + 1}
//                                                   >
//                                                     <Input type="hidden" />
//                                                   </Form.Item>
//                                                 </Row>
//                                               </Card>
//                                             </Col>
//                                           );
//                                         })}
//                                       </Row>
//                                     )}
//                                   </Form.List>
//                                 </div>

//                                 {/* EXTRA SERVICES SECTION */}
//                                 <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fffbe6', borderRadius: 6 }}>
//                                   <div style={{ marginBottom: 12 }}>
//                                     <Text strong style={{ fontSize: 14 }}>Update Extra Services</Text>
//                                     <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>
//                                       - Add or update additional services
//                                     </Text>
//                                   </div>

//                                   <Form.List name={[subName, 'extraServices']}>
//                                     {(extraFields, { add: addExtra, remove: removeExtra }) => (
//                                       <>
//                                         {extraFields.map(({ key: extraKey, name: extraName }, extraIndex) => {
//                                           const currentDesc = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'description']);
//                                           const currentExtraDate = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'date']);
//                                           const currentExtraPerson = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'person']);
//                                           const isExtraComplete = !!(currentDesc && currentExtraDate && currentExtraPerson);

//                                           return (
//                                             <Card
//                                               key={extraKey}
//                                               size="small"
//                                               style={{ marginBottom: 8, backgroundColor: '#fff' }}
//                                             >
//                                               <Row gutter={8} align="middle">
//                                                 <Col span={2}>
//                                                   <div
//                                                     style={{
//                                                       width: 32,
//                                                       height: 32,
//                                                       borderRadius: '6px',
//                                                       backgroundColor: isExtraComplete ? '#faad14' : '#d9d9d9',
//                                                       display: 'flex',
//                                                       alignItems: 'center',
//                                                       justifyContent: 'center',
//                                                       color: '#fff',
//                                                       fontWeight: 'bold',
//                                                       fontSize: 13,
//                                                     }}
//                                                   >
//                                                     E{extraIndex + 1}
//                                                   </div>
//                                                 </Col>

//                                                 <Col span={8}>
//                                                   <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                                     Service Description
//                                                   </Text>
//                                                   <Form.Item
//                                                     name={[extraName, 'description']}
//                                                     style={{ marginBottom: 0 }}
//                                                   >
//                                                     <Input
//                                                       placeholder={`Extra service ${extraIndex + 1} description`}
//                                                       size="small"
//                                                     />
//                                                   </Form.Item>
//                                                 </Col>

//                                                 <Col span={5}>
//                                                   <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                                     Date
//                                                   </Text>
//                                                   <Form.Item
//                                                     name={[extraName, 'date']}
//                                                     style={{ marginBottom: 0 }}
//                                                   >
//                                                     <DatePicker
//                                                       placeholder="Date"
//                                                       style={{ width: '100%' }}
//                                                       size="small"
//                                                       format="DD-MM-YYYY"
//                                                     />
//                                                   </Form.Item>
//                                                 </Col>

//                                                 <Col span={6}>
//                                                   <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                                     Person Name
//                                                   </Text>
//                                                   <Form.Item
//                                                     name={[extraName, 'person']}
//                                                     style={{ marginBottom: 0 }}
//                                                   >
//                                                     <Input
//                                                       placeholder="Person name"
//                                                       size="small"
//                                                       prefix={<UserOutlined style={{ fontSize: 12 }} />}
//                                                     />
//                                                   </Form.Item>
//                                                 </Col>

//                                                 <Col span={3} style={{ textAlign: 'center' }}>
//                                                   {isExtraComplete ? (
//                                                     <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
//                                                   ) : (
//                                                     <Button
//                                                       danger
//                                                       size="small"
//                                                       type="text"
//                                                       onClick={() => removeExtra(extraName)}
//                                                       icon={<DeleteOutlined />}
//                                                     />
//                                                   )}
//                                                 </Col>
//                                               </Row>
//                                             </Card>
//                                           );
//                                         })}

//                                         <Button
//                                           type="dashed"
//                                           size="small"
//                                           onClick={() => addExtra()}
//                                           icon={<PlusOutlined />}
//                                           style={{ marginTop: 4 }}
//                                         >
//                                           Add Extra Service
//                                         </Button>
//                                       </>
//                                     )}
//                                   </Form.List>
//                                 </div>
//                               </Card>
//                             ))}

//                             <Button
//                               type="dashed"
//                               size="small"
//                               onClick={() => addSub()}
//                               icon={<PlusOutlined />}
//                               style={{ marginTop: 8 }}
//                             >
//                               Add Sub Service
//                             </Button>
//                           </>
//                         )}
//                       </Form.List>
//                     </Card>
//                   ))}

//                   <Button
//                     type="dashed"
//                     onClick={() => addService()}
//                     icon={<PlusOutlined />}
//                     size="large"
//                   >
//                     Add Main Service
//                   </Button>
//                 </>
//               )}
//             </Form.List>
//           </Card>

//           <Form.Item style={{ marginTop: 16, marginBottom: 0 }}>
//             <Row justify="end">
//               <Space size={8}>
//                 <Button onClick={() => setEditModalVisible(false)} size="large">
//                   Cancel
//                 </Button>
//                 <Button type="primary" htmlType="submit" loading={isUpdating} size="large" icon={<EditOutlined />}>
//                   {isUpdating ? 'Updating...' : 'Update Service & Visits'}
//                 </Button>
//               </Space>
//             </Row>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ServiceManagement;





// import { useState, useRef } from 'react';
// import {
//   Button,
//   Table,
//   Space,
//   Modal,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   DatePicker,
//   Card,
//   Popconfirm,
//   Tag,
//   Row,
//   Col,
//   Typography,
//   Divider,
//   Badge,
//   Tooltip,
// } from 'antd';
// import {
//   DeleteOutlined,
//   EditOutlined,
//   DownloadOutlined,
//   PlusOutlined,
//   EyeOutlined,
//   CalendarOutlined,
//   UserOutlined,
//   FileTextOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
// } from '@ant-design/icons';
// import type { ColumnsType } from 'antd/es/table';
// import dayjs from 'dayjs';
// import * as XLSX from 'xlsx';
// import {
//   useGetAllServicesQuery,
//   useDeleteServiceMutation,
//   useUpdateServiceMutation,
// } from '../../redux/features/management/serviceApi';
// import toastMessage from '../../lib/toastMessage';

// const { Title, Text } = Typography;

// interface Visit {
//   visitNumber: number;
//   date: string | null;
//   person: string;
//   completed: boolean;
// }

// interface ExtraService {
//   description: string;
//   date: string | null;
//   person: string;
// }

// interface SubService {
//   subServiceName: string;
//   frequency: string;
//   plannedCount: number;
//   visits: Visit[];
//   extraServices: ExtraService[];
// }

// interface ServiceGroup {
//   mainService: string;
//   subServices: SubService[];
// }

// interface Service {
//   _id: string;
//   clientName: string;
//   gstPercentage: number;
//   billingType: string;
//   billingAddress: string;
//   workAddress: string;
//   serviceStartDate: string;
//   serviceEndDate: string;
//   services: ServiceGroup[];
//   createdAt: string;
// }

// const mainServices = [
//   'AMC',
//   'Deep Cleaning',
//   'Bathroom Cleaning',
//   'Kitchen Cleaning',
//   'Pest Control',
// ];

// const subServices = [
//   'Rodent Control',
//   'Mosquito Control',
//   'Termite Control',
//   'General Pest Control',
//   'Snake Control',
// ];

// const frequencyOptions = [
//   { label: 'Daily', value: 'daily', count: 30 },
//   { label: 'Weekly Once', value: 'weekly_once', count: 4 },
//   { label: 'Weekly Twice', value: 'weekly_twice', count: 8 },
//   { label: 'Weekly Thrice', value: 'weekly_thrice', count: 12 },
//   { label: 'Monthly Once', value: 'monthly_once', count: 1 },
//   { label: 'Quarterly Once', value: 'quarterly_once', count: 4 },
//   { label: 'Yearly Once', value: 'yearly_once', count: 1 },
// ];

// const ServiceManagement = () => {
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [form] = Form.useForm();

//   // ref for capturing view modal (PDF export)
//   const printRef = useRef<HTMLDivElement | null>(null);

//   const { data: servicesData, isLoading } = useGetAllServicesQuery(undefined);
//   const [deleteService] = useDeleteServiceMutation();
//   const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

//   const services = servicesData?.data || [];

//   // Calculate statistics
//   const calculateServiceStats = (service: Service) => {
//     let totalVisits = 0;
//     let completedVisits = 0;
//     let totalExtra = 0;

//     service.services.forEach((sg) => {
//       sg.subServices.forEach((ss) => {
//         totalVisits += ss.visits?.length || 0;
//         completedVisits += ss.visits?.filter((v) => v.completed).length || 0;
//         totalExtra += ss.extraServices?.filter((e) => e.description && e.date).length || 0;
//       });
//     });

//     return { totalVisits, completedVisits, totalExtra };
//   };

//   const handleView = (record: Service) => {
//     setSelectedService(record);
//     setViewModalVisible(true);
//   };

//   // Robust handleEdit: open modal first (so Form.List children mount), then set values
//   const handleEdit = (record: Service) => {
//     if (!record) return;
//     setSelectedService(record);

//     // Open edit modal first to ensure nested Form.List mounts (forceRender on Modal is also set)
//     setEditModalVisible(true);

//     // Build transformed services to match Form.List structure and convert dates to dayjs
//     const transformedServices = (record.services || []).map((sg) => ({
//       mainService: sg.mainService ?? '',
//       subServices: (sg.subServices || []).map((ss) => ({
//         subServiceName: ss.subServiceName ?? '',
//         frequency: ss.frequency ?? '',
//         plannedCount: ss.plannedCount ?? (ss.visits?.length ?? 0),
//         visits: (ss.visits || []).map((v, idx) => ({
//           visitNumber: v.visitNumber ?? idx + 1,
//           date: v.date ? dayjs(v.date) : null,
//           person: v.person ?? '',
//           completed: !!(v.date && v.person),
//         })),
//         extraServices: (ss.extraServices || []).map((e) => ({
//           description: e.description ?? '',
//           date: e.date ? dayjs(e.date) : null,
//           person: e.person ?? '',
//         })),
//       })),
//     }));

//     // Wait a tick so nested lists are ready, then populate form
//     setTimeout(() => {
//       try {
//         form.resetFields();
//         form.setFieldsValue({
//           clientName: record.clientName ?? '',
//           gstPercentage: record.gstPercentage ?? 0,
//           billingType: record.billingType ?? '',
//           billingAddress: record.billingAddress ?? '',
//           workAddress: record.workAddress ?? '',
//           serviceStartDate: record.serviceStartDate ? dayjs(record.serviceStartDate) : null,
//           serviceEndDate: record.serviceEndDate ? dayjs(record.serviceEndDate) : null,
//           services: transformedServices,
//         });
//       } catch (err) {
//         // keep safe: log error
//         // eslint-disable-next-line no-console
//         console.error('handleEdit setFieldsValue error', err);
//       }
//     }, 60);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await deleteService(id).unwrap();
//       toastMessage({ icon: 'success', text: res.message || 'Service deleted successfully' });
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to delete service' });
//     }
//   };

//   const handleUpdate = async (values: any) => {
//     try {
//       // Transform the data back to ISO strings
//       const transformedServices = values.services?.map((service: any) => ({
//         ...service,
//         subServices: service.subServices?.map((subService: any) => ({
//           ...subService,
//           visits: subService.visits?.map((visit: any) => ({
//             ...visit,
//             date: visit.date ? visit.date.toISOString() : null,
//             completed: !!(visit.date && visit.person),
//           })) || [],
//           extraServices: subService.extraServices
//             ?.map((extra: any) => ({
//               ...extra,
//               date: extra.date ? extra.date.toISOString() : null,
//             }))
//             .filter((e: any) => e.description || e.date || e.person) || [],
//         })) || [],
//       })) || [];

//       const payload = {
//         ...values,
//         serviceStartDate: values.serviceStartDate?.toISOString(),
//         serviceEndDate: values.serviceEndDate?.toISOString(),
//         services: transformedServices,
//       };

//       const res = await updateService({
//         id: selectedService?._id,
//         data: payload,
//       }).unwrap();

//       if (res.statusCode === 200 || res.status === 'success') {
//         toastMessage({ icon: 'success', text: res.message || 'Service updated successfully' });
//         setEditModalVisible(false);
//         form.resetFields();
//       }
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to update service' });
//     }
//   };

//   const handleDownloadExcel = () => {
//     const exportData = services.map((service: Service) => {
//       const stats = calculateServiceStats(service);
//       return {
//         'Client Name': service.clientName,
//         'GST %': service.gstPercentage,
//         'Billing Type': service.billingType,
//         'Work Address': service.workAddress,
//         'Billing Address': service.billingAddress,
//         'Start Date': dayjs(service.serviceStartDate).format('DD/MM/YYYY'),
//         'End Date': dayjs(service.serviceEndDate).format('DD/MM/YYYY'),
//         'Main Services': service.services.map((s) => s.mainService).join(', '),
//         'Total Visits': stats.totalVisits,
//         'Completed Visits': stats.completedVisits,
//         'Extra Services': stats.totalExtra,
//         'Created At': dayjs(service.createdAt).format('DD/MM/YYYY HH:mm'),
//       };
//     });

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Services');
//     XLSX.writeFile(wb, `services_${dayjs().format('YYYY-MM-DD')}.xlsx`);
//     toastMessage({ icon: 'success', text: 'Excel downloaded successfully' });
//   };

//   // Export current view modal content as PDF (rasterized image)
//   const handleExportPDF = async () => {
//     if (!printRef.current || !selectedService) {
//       toastMessage({ icon: 'error', text: 'Nothing to export' });
//       return;
//     }

//     try {
//       // dynamic import to avoid build-time resolve issues
//       const html2canvasModule: any = await import('html2canvas');
//       const html2canvas = html2canvasModule?.default ?? html2canvasModule;

//       const jspdfModule: any = await import('jspdf');
//       const jsPDFConstructor = jspdfModule?.jsPDF ?? jspdfModule?.default ?? jspdfModule;

//       // small delay for fonts/images
//       await new Promise((r) => setTimeout(r, 300));

//       const canvas = await html2canvas(printRef.current, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//       });

//       const imgData = canvas.toDataURL('image/png');

//       const pdf = new jsPDFConstructor({
//         orientation: 'landscape',
//         unit: 'pt',
//         format: 'a4',
//       });

//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();

//       const imgProps = (pdf as any).getImageProperties(imgData);
//       const imgWidth = pageWidth;
//       const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

//       if (imgHeight <= pageHeight) {
//         pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       } else {
//         // slice into multiple pages
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;
//         const ratio = canvasWidth / pageWidth;
//         const pageCanvasHeight = Math.floor(pageHeight * ratio);

//         let remainingHeight = canvasHeight;
//         let position = 0;
//         let firstPage = true;

//         while (remainingHeight > 0) {
//           const pageCanvas = document.createElement('canvas');
//           pageCanvas.width = canvasWidth;
//           pageCanvas.height = Math.min(pageCanvasHeight, remainingHeight);

//           const ctx = pageCanvas.getContext('2d')!;
//           ctx.drawImage(
//             canvas,
//             0,
//             position,
//             canvasWidth,
//             pageCanvas.height,
//             0,
//             0,
//             canvasWidth,
//             pageCanvas.height
//           );

//           const pageData = pageCanvas.toDataURL('image/png');
//           const pageImgHeight = pageCanvas.height / ratio;

//           if (!firstPage) pdf.addPage();
//           pdf.addImage(pageData, 'PNG', 0, 0, pageWidth, pageImgHeight);

//           firstPage = false;
//           position += pageCanvas.height;
//           remainingHeight -= pageCanvas.height;
//         }
//       }

//       const fileName = `service_${selectedService.clientName.replace(/\s+/g, '_')}_${dayjs().format('YYYY-MM-DD')}.pdf`;
//       pdf.save(fileName);
//       toastMessage({ icon: 'success', text: 'PDF downloaded successfully' });
//     } catch (err) {
//       // eslint-disable-next-line no-console
//       console.error('Export PDF error', err);
//       toastMessage({ icon: 'error', text: 'Failed to export PDF' });
//     }
//   };

//   const columns: ColumnsType<Service> = [
//     {
//       title: 'Client Details',
//       key: 'clientDetails',
//       width: 250,
//       render: (_, record) => (
//         <div>
//           <Text strong style={{ display: 'block', fontSize: 14 }}>
//             {record.clientName}
//           </Text>
//           <Space size={4} style={{ marginTop: 4 }}>
//             <Tag color="blue">{record.billingType}</Tag>
//             <Tag color="green">{record.gstPercentage}% GST</Tag>
//           </Space>
//         </div>
//       ),
//     },
//     {
//       title: 'Service Period',
//       key: 'period',
//       width: 180,
//       render: (_, record) => (
//         <div>
//           <div style={{ marginBottom: 4 }}>
//             <CalendarOutlined style={{ marginRight: 4, color: '#1890ff' }} />
//             <Text style={{ fontSize: 12 }}>
//               {dayjs(record.serviceStartDate).format('DD MMM YYYY')}
//             </Text>
//           </div>
//           <div>
//             <CalendarOutlined style={{ marginRight: 4, color: '#52c41a' }} />
//             <Text style={{ fontSize: 12 }}>
//               {dayjs(record.serviceEndDate).format('DD MMM YYYY')}
//             </Text>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Services',
//       key: 'services',
//       width: 200,
//       render: (_, record) => (
//         <Space direction="vertical" size={4}>
//           {record.services.slice(0, 2).map((s, idx) => (
//             <Tag key={idx} color="purple">
//               {s.mainService}
//             </Tag>
//           ))}
//           {record.services.length > 2 && (
//             <Tag color="default">+{record.services.length - 2} more</Tag>
//           )}
//         </Space>
//       ),
//     },
//     {
//       title: 'Progress',
//       key: 'progress',
//       width: 150,
//       render: (_, record) => {
//         const stats = calculateServiceStats(record);
//         const percentage =
//           stats.totalVisits > 0
//             ? Math.round((stats.completedVisits / stats.totalVisits) * 100)
//             : 0;

//         return (
//           <Space direction="vertical" size={4}>
//             <div>
//               <Badge
//                 status={percentage === 100 ? 'success' : 'processing'}
//                 text={
//                   <Text style={{ fontSize: 12 }}>
//                     {stats.completedVisits}/{stats.totalVisits} Visits
//                   </Text>
//                 }
//               />
//             </div>
//             {stats.totalExtra > 0 && (
//               <Text type="secondary" style={{ fontSize: 11 }}>
//                 +{stats.totalExtra} Extra
//               </Text>
//             )}
//           </Space>
//         );
//       },
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 180,
//       fixed: 'right',
//       render: (_, record) => (
//         <Space size={4}>
//           <Tooltip title="View Details">
//             <Button
//               type="default"
//               icon={<EyeOutlined />}
//               size="small"
//               onClick={() => handleView(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Edit">
//             <Button
//               type="primary"
//               icon={<EditOutlined />}
//               size="small"
//               onClick={() => handleEdit(record)}
//             />
//           </Tooltip>
//           <Popconfirm
//             title="Delete Service"
//             description="Are you sure you want to delete this service?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Tooltip title="Delete">
//               <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
//             </Tooltip>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
//       <Card bordered={false} style={{ marginBottom: 16 }}>
//         <Row justify="space-between" align="middle">
//           <Col>
//             <Title level={3} style={{ margin: 0 }}>
//               <FileTextOutlined style={{ marginRight: 12, color: '#1890ff' }} />
//               Service Management
//             </Title>
//             <Text type="secondary">Manage and track all service contracts and visits</Text>
//           </Col>
//           <Col>
//             <Space size={8}>
//               <Button
//                 icon={<DownloadOutlined />}
//                 onClick={handleDownloadExcel}
//                 disabled={services.length === 0}
//                 size="large"
//               >
//                 Export Excel
//               </Button>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => (window.location.href = '/services/create')}
//                 size="large"
//               >
//                 Add New Service
//               </Button>
//             </Space>
//           </Col>
//         </Row>
//       </Card>

//       <Card bordered={false}>
//         <Table
//           columns={columns}
//           dataSource={services}
//           rowKey="_id"
//           loading={isLoading}
//           scroll={{ x: 1200 }}
//           pagination={{
//             pageSize: 10,
//             showSizeChanger: true,
//             showTotal: (total) => `Total ${total} services`,
//             pageSizeOptions: ['10', '20', '50'],
//           }}
//         />
//       </Card>

//       {/* View Details Modal */}
//       <Modal
//         title={
//           <Space>
//             <EyeOutlined style={{ color: '#1890ff' }} />
//             <span>Service Details</span>
//           </Space>
//         }
//         open={viewModalVisible}
//         onCancel={() => setViewModalVisible(false)}
//         footer={[
//           <Button key="close" onClick={() => setViewModalVisible(false)}>
//             Close
//           </Button>,
//           <Button key="export" icon={<DownloadOutlined />} onClick={handleExportPDF}>
//             Download as PDF
//           </Button>,
//           <Button
//             key="edit"
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => {
//               // close view then open edit safely
//               setViewModalVisible(false);
//               setTimeout(() => {
//                 if (selectedService) handleEdit(selectedService);
//               }, 250);
//             }}
//           >
//             Edit Service
//           </Button>,
//         ]}
//         width={900}
//       >
//         {selectedService && (
//           <div ref={printRef} style={{ background: '#ffffff', padding: 16 }}>
//             {/* Client Information */}
//             <Card size="small" title="Client Information" style={{ marginBottom: 16 }}>
//               <Row gutter={[16, 16]}>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Client Name
//                   </Text>
//                   <Text strong>{selectedService.clientName}</Text>
//                 </Col>
//                 <Col span={6}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     GST
//                   </Text>
//                   <Tag color="green">{selectedService.gstPercentage}%</Tag>
//                 </Col>
//                 <Col span={6}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Billing Type
//                   </Text>
//                   <Tag color="blue">{selectedService.billingType}</Tag>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Work Address
//                   </Text>
//                   <Text>{selectedService.workAddress}</Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Billing Address
//                   </Text>
//                   <Text>{selectedService.billingAddress}</Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Service Start Date
//                   </Text>
//                   <Text strong>{dayjs(selectedService.serviceStartDate).format('DD MMMM YYYY')}</Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
//                     Service End Date
//                   </Text>
//                   <Text strong>{dayjs(selectedService.serviceEndDate).format('DD MMMM YYYY')}</Text>
//                 </Col>
//               </Row>
//             </Card>

//             {/* Services Details */}
//             <Card size="small" title="Services Provided">
//               {selectedService.services.map((serviceGroup, sgIdx) => (
//                 <Card
//                   key={sgIdx}
//                   type="inner"
//                   size="small"
//                   title={
//                     <Tag color="purple" style={{ fontSize: 14 }}>
//                       {serviceGroup.mainService}
//                     </Tag>
//                   }
//                   style={{ marginBottom: 12 }}
//                 >
//                   {serviceGroup.subServices.map((subService, ssIdx) => {
//                     const completedVisits = subService.visits?.filter((v) => v.completed).length || 0;
//                     const totalVisits = subService.visits?.length || 0;

//                     return (
//                       <Card key={ssIdx} size="small" style={{ marginBottom: 8, border: '1px solid #e8e8e8' }}>
//                         <Row gutter={[16, 8]} align="middle">
//                           <Col span={8}>
//                             <Text strong style={{ fontSize: 13 }}>
//                               {subService.subServiceName}
//                             </Text>
//                           </Col>
//                           <Col span={6}>
//                             <Tag color="blue">{subService.frequency}</Tag>
//                           </Col>
//                           <Col span={6}>
//                             <Badge status={completedVisits === totalVisits ? 'success' : 'processing'} text={`${completedVisits}/${totalVisits} Visits`} />
//                           </Col>
//                         </Row>

//                         {subService.visits && subService.visits.length > 0 && (
//                           <div style={{ marginTop: 12 }}>
//                             <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
//                               Visit Schedule:
//                             </Text>
//                             <Row gutter={[8, 8]}>
//                               {subService.visits.slice(0, 4).map((visit, vIdx) => (
//                                 <Col span={12} key={vIdx}>
//                                   <div
//                                     style={{
//                                       padding: '6px 8px',
//                                       background: visit.completed ? '#f6ffed' : '#fafafa',
//                                       border: `1px solid ${visit.completed ? '#b7eb8f' : '#d9d9d9'}`,
//                                       borderRadius: 4,
//                                       fontSize: 11,
//                                     }}
//                                   >
//                                     <Space size={4}>
//                                       <Badge status={visit.completed ? 'success' : 'default'} />
//                                       <Text style={{ fontSize: 11 }}>Visit {visit.visitNumber}</Text>
//                                       {visit.date && <Text type="secondary" style={{ fontSize: 11 }}>- {dayjs(visit.date).format('DD/MM/YY')}</Text>}
//                                       {visit.person && (
//                                         <Text style={{ fontSize: 11 }}>
//                                           <UserOutlined style={{ fontSize: 10, marginRight: 2 }} />
//                                           {visit.person}
//                                         </Text>
//                                       )}
//                                     </Space>
//                                   </div>
//                                 </Col>
//                               ))}
//                             </Row>
//                             {subService.visits.length > 4 && <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: 'block' }}>+{subService.visits.length - 4} more visits</Text>}
//                           </div>
//                         )}

//                         {subService.extraServices && subService.extraServices.some((e) => e.description || e.date) && (
//                           <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed #d9d9d9' }}>
//                             <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
//                               Extra Services:
//                             </Text>
//                             {subService.extraServices
//                               .filter((e) => e.description || e.date)
//                               .map((extra, eIdx) => (
//                                 <div
//                                   key={eIdx}
//                                   style={{
//                                     padding: '4px 8px',
//                                     background: '#fffbe6',
//                                     border: '1px solid #ffe58f',
//                                     borderRadius: 4,
//                                     fontSize: 11,
//                                     marginBottom: 4,
//                                   }}
//                                 >
//                                   <Space size={4}>
//                                     <Tag color="orange" style={{ fontSize: 10, padding: '0 4px' }}>
//                                       E{eIdx + 1}
//                                     </Tag>
//                                     <Text style={{ fontSize: 11 }}>{extra.description}</Text>
//                                     {extra.date && <Text type="secondary" style={{ fontSize: 11 }}>- {dayjs(extra.date).format('DD/MM/YY')}</Text>}
//                                     {extra.person && (
//                                       <Text style={{ fontSize: 11 }}>
//                                         <UserOutlined style={{ fontSize: 10, marginRight: 2 }} />
//                                         {extra.person}
//                                       </Text>
//                                     )}
//                                   </Space>
//                                 </div>
//                               ))}
//                           </div>
//                         )}
//                       </Card>
//                     );
//                   })}
//                 </Card>
//               ))}
//             </Card>
//           </div>
//         )}
//       </Modal>

//       {/* Edit Modal with Visit Tracking */}
//       <Modal
//         title={
//           <Space>
//             <EditOutlined style={{ color: '#1890ff' }} />
//             <span>Edit Service & Update Visits</span>
//           </Space>
//         }
//         open={editModalVisible}
//         onCancel={() => {
//           setEditModalVisible(false);
//           form.resetFields();
//         }}
//         footer={null}
//         width={1200}
//         forceRender={true} // ensure nested Form.List mounts even when modal closed
//       >
//         <Form form={form} layout="vertical" onFinish={handleUpdate}>
//           <Card size="small" title="Client Information" style={{ marginBottom: 16 }}>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item name="clientName" label="Client Name" rules={[{ required: true }]}>
//                   <Input />
//                 </Form.Item>
//               </Col>

//               <Col span={6}>
//                 <Form.Item name="gstPercentage" label="GST %" rules={[{ required: true }]}>
//                   <InputNumber min={0} max={28} style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>

//               <Col span={6}>
//                 <Form.Item name="billingType" label="Billing Type" rules={[{ required: true }]}>
//                   <Select>
//                     <Select.Option value="service">Service to Service</Select.Option>
//                     <Select.Option value="monthly">Monthly</Select.Option>
//                     <Select.Option value="quarterly">Quarterly</Select.Option>
//                     <Select.Option value="yearly">Yearly</Select.Option>
//                   </Select>
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item name="serviceStartDate" label="Start Date" rules={[{ required: true }]}>
//                   <DatePicker style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item name="serviceEndDate" label="End Date" rules={[{ required: true }]}>
//                   <DatePicker style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item name="workAddress" label="Work Address" rules={[{ required: true }]}>
//                   <Input.TextArea rows={2} />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item name="billingAddress" label="Billing Address" rules={[{ required: true }]}>
//                   <Input.TextArea rows={2} />
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Card>

//           <Card size="small" title="Services, Visits & Extra Services">
//             <Form.List name="services">
//               {(serviceFields, { add: addService, remove: removeService }) => (
//                 <>
//                   {serviceFields.map(({ key, name: serviceName }) => (
//                     <Card key={key} type="inner" size="small" style={{ marginBottom: 16, backgroundColor: '#fafafa' }}>
//                       <Space align="start" style={{ display: 'flex', marginBottom: 12 }}>
//                         <Form.Item name={[serviceName, 'mainService']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
//                           <Select placeholder="Main Service" style={{ width: 200 }}>
//                             {mainServices.map((ms) => (
//                               <Select.Option key={ms} value={ms}>
//                                 {ms}
//                               </Select.Option>
//                             ))}
//                           </Select>
//                         </Form.Item>
//                         <Button danger size="small" onClick={() => removeService(serviceName)}>
//                           Remove Main Service
//                         </Button>
//                       </Space>

//                       <Form.List name={[serviceName, 'subServices']}>
//                         {(subFields, { add: addSub, remove: removeSub }) => (
//                           <>
//                             {subFields.map(({ key: subKey, name: subName }) => (
//                               <Card
//                                 key={subKey}
//                                 size="small"
//                                 style={{ marginBottom: 12, backgroundColor: '#fff', border: '2px solid #1890ff' }}
//                               >
//                                 {/* Sub Service Header */}
//                                 <Row gutter={8} align="middle" style={{ marginBottom: 12 }}>
//                                   <Col span={7}>
//                                     <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Sub Service</Text>
//                                     <Form.Item name={[subName, 'subServiceName']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
//                                       <Select placeholder="Sub Service" style={{ width: '100%' }}>
//                                         {subServices.map((ss) => (
//                                           <Select.Option key={ss} value={ss}>
//                                             {ss}
//                                           </Select.Option>
//                                         ))}
//                                       </Select>
//                                     </Form.Item>
//                                   </Col>

//                                   <Col span={5}>
//                                     <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Frequency</Text>
//                                     <Form.Item name={[subName, 'frequency']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
//                                       <Select placeholder="Frequency" style={{ width: '100%' }}>
//                                         {frequencyOptions.map((freq) => (
//                                           <Select.Option key={freq.value} value={freq.value}>
//                                             {freq.label}
//                                           </Select.Option>
//                                         ))}
//                                       </Select>
//                                     </Form.Item>
//                                   </Col>

//                                   <Col span={4}>
//                                     <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Total Visits</Text>
//                                     <Form.Item name={[subName, 'plannedCount']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
//                                       <InputNumber min={1} placeholder="Count" style={{ width: '100%' }} />
//                                     </Form.Item>
//                                   </Col>

//                                   <Col span={8} style={{ textAlign: 'right', paddingTop: 22 }}>
//                                     <Button danger size="small" onClick={() => removeSub(subName)}>Remove Sub Service</Button>
//                                   </Col>
//                                 </Row>

//                                 <Divider style={{ margin: '12px 0' }} />

//                                 {/* VISIT TRACKING SECTION */}
//                                 <div style={{ marginBottom: 16 }}>
//                                   <div style={{ backgroundColor: '#e6f7ff', padding: '8px 12px', borderRadius: 4, marginBottom: 12 }}>
//                                     <CalendarOutlined style={{ marginRight: 8 }} />
//                                     <Text strong style={{ fontSize: 14 }}>Update Visit Tracking</Text>
//                                   </div>

//                                   <Form.List name={[subName, 'visits']}>
//                                     {(visitFields) => (
//                                       <Row gutter={[8, 8]}>
//                                         {visitFields.map(({ key: visitKey, name: visitName }, visitIndex) => {
//                                           const currentDate = form.getFieldValue(['services', serviceName, 'subServices', subName, 'visits', visitName, 'date']);
//                                           const currentPerson = form.getFieldValue(['services', serviceName, 'subServices', subName, 'visits', visitName, 'person']);
//                                           const isCompleted = !!(currentDate && currentPerson);

//                                           return (
//                                             <Col span={12} key={visitKey}>
//                                               <Card
//                                                 size="small"
//                                                 style={{
//                                                   border: isCompleted ? '2px solid #52c41a' : '1px solid #d9d9d9',
//                                                   backgroundColor: isCompleted ? '#f6ffed' : '#fafafa',
//                                                 }}
//                                               >
//                                                 <Row gutter={8} align="middle">
//                                                   <Col span={3}>
//                                                     <div
//                                                       style={{
//                                                         width: 36,
//                                                         height: 36,
//                                                         borderRadius: '6px',
//                                                         backgroundColor: isCompleted ? '#52c41a' : '#d9d9d9',
//                                                         display: 'flex',
//                                                         alignItems: 'center',
//                                                         justifyContent: 'center',
//                                                         color: '#fff',
//                                                         fontWeight: 'bold',
//                                                         fontSize: 14,
//                                                       }}
//                                                     >
//                                                       {visitIndex + 1}
//                                                     </div>
//                                                   </Col>

//                                                   <Col span={10}>
//                                                     <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>Visit Date</Text>
//                                                     <Form.Item name={[visitName, 'date']} style={{ marginBottom: 0 }}>
//                                                       <DatePicker style={{ width: '100%' }} placeholder="Select date" size="small" format="DD-MM-YYYY" />
//                                                     </Form.Item>
//                                                   </Col>

//                                                   <Col span={9}>
//                                                     <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>Person Name</Text>
//                                                     <Form.Item name={[visitName, 'person']} style={{ marginBottom: 0 }}>
//                                                       <Input placeholder="Person" prefix={<UserOutlined style={{ fontSize: 12 }} />} size="small" />
//                                                     </Form.Item>
//                                                   </Col>

//                                                   <Col span={2} style={{ textAlign: 'center' }}>
//                                                     {isCompleted ? (
//                                                       <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
//                                                     ) : (
//                                                       <CloseCircleOutlined style={{ fontSize: 20, color: '#d9d9d9' }} />
//                                                     )}
//                                                   </Col>

//                                                   <Form.Item name={[visitName, 'visitNumber']} hidden initialValue={visitIndex + 1}><Input type="hidden" /></Form.Item>
//                                                 </Row>
//                                               </Card>
//                                             </Col>
//                                           );
//                                         })}
//                                       </Row>
//                                     )}
//                                   </Form.List>
//                                 </div>

//                                 {/* EXTRA SERVICES SECTION */}
//                                 <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fffbe6', borderRadius: 6 }}>
//                                   <div style={{ marginBottom: 12 }}>
//                                     <Text strong style={{ fontSize: 14 }}>Update Extra Services</Text>
//                                     <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>- Add or update additional services</Text>
//                                   </div>

//                                   <Form.List name={[subName, 'extraServices']}>
//                                     {(extraFields, { add: addExtra, remove: removeExtra }) => (
//                                       <>
//                                         {extraFields.map(({ key: extraKey, name: extraName }, extraIndex) => {
//                                           const currentDesc = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'description']);
//                                           const currentExtraDate = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'date']);
//                                           const currentExtraPerson = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'person']);
//                                           const isExtraComplete = !!(currentDesc && currentExtraDate && currentExtraPerson);

//                                           return (
//                                             <Card key={extraKey} size="small" style={{ marginBottom: 8, backgroundColor: '#fff' }}>
//                                               <Row gutter={8} align="middle">
//                                                 <Col span={2}>
//                                                   <div
//                                                     style={{
//                                                       width: 32,
//                                                       height: 32,
//                                                       borderRadius: '6px',
//                                                       backgroundColor: isExtraComplete ? '#faad14' : '#d9d9d9',
//                                                       display: 'flex',
//                                                       alignItems: 'center',
//                                                       justifyContent: 'center',
//                                                       color: '#fff',
//                                                       fontWeight: 'bold',
//                                                       fontSize: 13,
//                                                     }}
//                                                   >
//                                                     E{extraIndex + 1}
//                                                   </div>
//                                                 </Col>

//                                                 <Col span={8}>
//                                                   <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>Service Description</Text>
//                                                   <Form.Item name={[extraName, 'description']} style={{ marginBottom: 0 }}>
//                                                     <Input placeholder={`Extra service ${extraIndex + 1} description`} size="small" />
//                                                   </Form.Item>
//                                                 </Col>

//                                                 <Col span={5}>
//                                                   <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>Date</Text>
//                                                   <Form.Item name={[extraName, 'date']} style={{ marginBottom: 0 }}>
//                                                     <DatePicker placeholder="Date" style={{ width: '100%' }} size="small" format="DD-MM-YYYY" />
//                                                   </Form.Item>
//                                                 </Col>

//                                                 <Col span={6}>
//                                                   <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>Person Name</Text>
//                                                   <Form.Item name={[extraName, 'person']} style={{ marginBottom: 0 }}>
//                                                     <Input placeholder="Person name" size="small" prefix={<UserOutlined style={{ fontSize: 12 }} />} />
//                                                   </Form.Item>
//                                                 </Col>

//                                                 <Col span={3} style={{ textAlign: 'center' }}>
//                                                   {isExtraComplete ? (
//                                                     <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
//                                                   ) : (
//                                                     <Button danger size="small" type="text" onClick={() => removeExtra(extraName)} icon={<DeleteOutlined />} />
//                                                   )}
//                                                 </Col>
//                                               </Row>
//                                             </Card>
//                                           );
//                                         })}

//                                         <Button type="dashed" size="small" onClick={() => addExtra()} icon={<PlusOutlined />} style={{ marginTop: 4 }}>
//                                           Add Extra Service
//                                         </Button>
//                                       </>
//                                     )}
//                                   </Form.List>
//                                 </div>
//                               </Card>
//                             ))}

//                             <Button type="dashed" size="small" onClick={() => addSub()} icon={<PlusOutlined />} style={{ marginTop: 8 }}>
//                               Add Sub Service
//                             </Button>
//                           </>
//                         )}
//                       </Form.List>
//                     </Card>
//                   ))}

//                   <Button type="dashed" onClick={() => addService()} icon={<PlusOutlined />} size="large">
//                     Add Main Service
//                   </Button>
//                 </>
//               )}
//             </Form.List>
//           </Card>

//           <Form.Item style={{ marginTop: 16, marginBottom: 0 }}>
//             <Row justify="end">
//               <Space size={8}>
//                 <Button onClick={() => { setEditModalVisible(false); form.resetFields(); }} size="large">Cancel</Button>
//                 <Button type="primary" htmlType="submit" loading={isUpdating} size="large" icon={<EditOutlined />}>
//                   {isUpdating ? 'Updating...' : 'Update Service & Visits'}
//                 </Button>
//               </Space>
//             </Row>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ServiceManagement;





import { useState, useRef } from 'react';
import {
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Card,
  Popconfirm,
  Tag,
  Row,
  Col,
  Typography,
  Divider,
  Badge,
  Tooltip,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
  PlusOutlined,
  EyeOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import {
  useGetAllServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from '../../redux/features/management/serviceApi';
import toastMessage from '../../lib/toastMessage';

const { Title, Text } = Typography;

interface Visit {
  visitNumber: number;
  date: string | null;
  person: string;
  completed: boolean;
}

interface ExtraService {
  description: string;
  date: string | null;
  person: string;
}

interface SubService {
  subServiceName: string;
  frequency: string;
  plannedCount: number;
  visits: Visit[];
  extraServices: ExtraService[];
}

interface ServiceGroup {
  mainService: string;
  subServices: SubService[];
}

interface Service {
  _id: string;
  clientName: string;
  gstPercentage: number;
  billingType: string;
  billingAddress: string;
  workAddress: string;
  serviceStartDate: string;
  serviceEndDate: string;
  services: ServiceGroup[];
  createdAt: string;
}

const mainServices = [
  'AMC',
  'Deep Cleaning',
  'Bathroom Cleaning',
  'Kitchen Cleaning',
  'Pest Control',
];

const subServices = [
  'Rodent Control',
  'Mosquito Control',
  'Termite Control',
  'General Pest Control',
  'Snake Control',
];

const frequencyOptions = [
  { label: 'Daily', value: 'daily', count: 30 },
  { label: 'Weekly Once', value: 'weekly_once', count: 4 },
  { label: 'Weekly Twice', value: 'weekly_twice', count: 8 },
  { label: 'Weekly Thrice', value: 'weekly_thrice', count: 12 },
  { label: 'Monthly Once', value: 'monthly_once', count: 1 },
  { label: 'Quarterly Once', value: 'quarterly_once', count: 4 },
  { label: 'Yearly Once', value: 'yearly_once', count: 1 },
];

const ServiceManagement = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [form] = Form.useForm();

  // track expanded visit lists in the view modal
  const [expandedVisits, setExpandedVisits] = useState<Record<string, boolean>>({});

  // ref for capturing view modal (PDF export)
  const printRef = useRef<HTMLDivElement | null>(null);

  const { data: servicesData, isLoading } = useGetAllServicesQuery(undefined);
  const [deleteService] = useDeleteServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

  const services = servicesData?.data || [];

  const toggleExpandedVisits = (key: string) => {
    setExpandedVisits((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate statistics
  const calculateServiceStats = (service: Service) => {
    let totalVisits = 0;
    let completedVisits = 0;
    let totalExtra = 0;

    service.services.forEach((sg) => {
      sg.subServices.forEach((ss) => {
        totalVisits += ss.visits?.length || 0;
        completedVisits += ss.visits?.filter((v) => v.completed).length || 0;
        totalExtra += ss.extraServices?.filter((e) => e.description && e.date).length || 0;
      });
    });

    return { totalVisits, completedVisits, totalExtra };
  };

  const handleView = (record: Service) => {
    setSelectedService(record);
    setViewModalVisible(true);
    // reset expanded state for new service
    setExpandedVisits({});
  };

  // Robust handleEdit: open modal first (so Form.List children mount), then set values
  const handleEdit = (record: Service) => {
    if (!record) return;
    setSelectedService(record);

    // Open edit modal first to ensure nested Form.List mounts (forceRender on Modal is also set)
    setEditModalVisible(true);

    // Build transformed services to match Form.List structure and convert dates to dayjs
    const transformedServices = (record.services || []).map((sg) => ({
      mainService: sg.mainService ?? '',
      subServices: (sg.subServices || []).map((ss) => ({
        subServiceName: ss.subServiceName ?? '',
        frequency: ss.frequency ?? '',
        plannedCount: ss.plannedCount ?? (ss.visits?.length ?? 0),
        visits: (ss.visits || []).map((v, idx) => ({
          visitNumber: v.visitNumber ?? idx + 1,
          date: v.date ? dayjs(v.date) : null,
          person: v.person ?? '',
          completed: !!(v.date && v.person),
        })),
        extraServices: (ss.extraServices || []).map((e) => ({
          description: e.description ?? '',
          date: e.date ? dayjs(e.date) : null,
          person: e.person ?? '',
        })),
      })),
    }));

    // Wait a tick so nested lists are ready, then populate form
    setTimeout(() => {
      try {
        form.resetFields();
        form.setFieldsValue({
          clientName: record.clientName ?? '',
          gstPercentage: record.gstPercentage ?? 0,
          billingType: record.billingType ?? '',
          billingAddress: record.billingAddress ?? '',
          workAddress: record.workAddress ?? '',
          serviceStartDate: record.serviceStartDate ? dayjs(record.serviceStartDate) : null,
          serviceEndDate: record.serviceEndDate ? dayjs(record.serviceEndDate) : null,
          services: transformedServices,
        });
      } catch (err) {
        // keep safe: log error
        // eslint-disable-next-line no-console
        console.error('handleEdit setFieldsValue error', err);
      }
    }, 60);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteService(id).unwrap();
      toastMessage({ icon: 'success', text: res.message || 'Service deleted successfully' });
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data?.message || 'Failed to delete service' });
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      // Transform the data back to ISO strings
      const transformedServices = values.services?.map((service: any) => ({
        ...service,
        subServices: service.subServices?.map((subService: any) => ({
          ...subService,
          visits: subService.visits?.map((visit: any) => ({
            ...visit,
            date: visit.date ? visit.date.toISOString() : null,
            completed: !!(visit.date && visit.person),
          })) || [],
          extraServices: subService.extraServices
            ?.map((extra: any) => ({
              ...extra,
              date: extra.date ? extra.date.toISOString() : null,
            }))
            .filter((e: any) => e.description || e.date || e.person) || [],
        })) || [],
      })) || [];

      const payload = {
        ...values,
        serviceStartDate: values.serviceStartDate?.toISOString(),
        serviceEndDate: values.serviceEndDate?.toISOString(),
        services: transformedServices,
      };

      const res = await updateService({
        id: selectedService?._id,
        data: payload,
      }).unwrap();

      if (res.statusCode === 200 || res.status === 'success') {
        toastMessage({ icon: 'success', text: res.message || 'Service updated successfully' });
        setEditModalVisible(false);
        form.resetFields();
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data?.message || 'Failed to update service' });
    }
  };

  const handleDownloadExcel = () => {
    const exportData = services.map((service: Service) => {
      const stats = calculateServiceStats(service);
      return {
        'Client Name': service.clientName,
        'GST %': service.gstPercentage,
        'Billing Type': service.billingType,
        'Work Address': service.workAddress,
        'Billing Address': service.billingAddress,
        'Start Date': dayjs(service.serviceStartDate).format('DD/MM/YYYY'),
        'End Date': dayjs(service.serviceEndDate).format('DD/MM/YYYY'),
        'Main Services': service.services.map((s) => s.mainService).join(', '),
        'Total Visits': stats.totalVisits,
        'Completed Visits': stats.completedVisits,
        'Extra Services': stats.totalExtra,
        'Created At': dayjs(service.createdAt).format('DD/MM/YYYY HH:mm'),
      };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Services');
    XLSX.writeFile(wb, `services_${dayjs().format('YYYY-MM-DD')}.xlsx`);
    toastMessage({ icon: 'success', text: 'Excel downloaded successfully' });
  };

  // Export current view modal content as PDF (rasterized image)
  const handleExportPDF = async () => {
    if (!printRef.current || !selectedService) {
      toastMessage({ icon: 'error', text: 'Nothing to export' });
      return;
    }

    try {
      // dynamic import to avoid build-time resolve issues
      const html2canvasModule: any = await import('html2canvas');
      const html2canvas = html2canvasModule?.default ?? html2canvasModule;

      const jspdfModule: any = await import('jspdf');
      const jsPDFConstructor = jspdfModule?.jsPDF ?? jspdfModule?.default ?? jspdfModule;

      // small delay for fonts/images
      await new Promise((r) => setTimeout(r, 300));

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDFConstructor({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = (pdf as any).getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // slice into multiple pages
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / pageWidth;
        const pageCanvasHeight = Math.floor(pageHeight * ratio);

        let remainingHeight = canvasHeight;
        let position = 0;
        let firstPage = true;

        while (remainingHeight > 0) {
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvasWidth;
          pageCanvas.height = Math.min(pageCanvasHeight, remainingHeight);

          const ctx = pageCanvas.getContext('2d')!;
          ctx.drawImage(
            canvas,
            0,
            position,
            canvasWidth,
            pageCanvas.height,
            0,
            0,
            canvasWidth,
            pageCanvas.height
          );

          const pageData = pageCanvas.toDataURL('image/png');
          const pageImgHeight = pageCanvas.height / ratio;

          if (!firstPage) pdf.addPage();
          pdf.addImage(pageData, 'PNG', 0, 0, pageWidth, pageImgHeight);

          firstPage = false;
          position += pageCanvas.height;
          remainingHeight -= pageCanvas.height;
        }
      }

      const fileName = `service_${selectedService.clientName.replace(/\s+/g, '_')}_${dayjs().format('YYYY-MM-DD')}.pdf`;
      pdf.save(fileName);
      toastMessage({ icon: 'success', text: 'PDF downloaded successfully' });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Export PDF error', err);
      toastMessage({ icon: 'error', text: 'Failed to export PDF' });
    }
  };

  const columns: ColumnsType<Service> = [
    {
      title: 'Client Details',
      key: 'clientDetails',
      width: 250,
      render: (_, record) => (
        <div>
          <Text strong style={{ display: 'block', fontSize: 14 }}>
            {record.clientName}
          </Text>
          <Space size={4} style={{ marginTop: 4 }}>
            <Tag color="blue">{record.billingType}</Tag>
            <Tag color="green">{record.gstPercentage}% GST</Tag>
          </Space>
        </div>
      ),
    },
    {
      title: 'Service Period',
      key: 'period',
      width: 180,
      render: (_, record) => (
        <div>
          <div style={{ marginBottom: 4 }}>
            <CalendarOutlined style={{ marginRight: 4, color: '#1890ff' }} />
            <Text style={{ fontSize: 12 }}>
              {dayjs(record.serviceStartDate).format('DD MMM YYYY')}
            </Text>
          </div>
          <div>
            <CalendarOutlined style={{ marginRight: 4, color: '#52c41a' }} />
            <Text style={{ fontSize: 12 }}>
              {dayjs(record.serviceEndDate).format('DD MMM YYYY')}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Services',
      key: 'services',
      width: 200,
      render: (_, record) => (
        <Space direction="vertical" size={4}>
          {record.services.slice(0, 2).map((s, idx) => (
            <Tag key={idx} color="purple">
              {s.mainService}
            </Tag>
          ))}
          {record.services.length > 2 && (
            <Tag color="default">+{record.services.length - 2} more</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Progress',
      key: 'progress',
      width: 150,
      render: (_, record) => {
        const stats = calculateServiceStats(record);
        const percentage =
          stats.totalVisits > 0
            ? Math.round((stats.completedVisits / stats.totalVisits) * 100)
            : 0;

        return (
          <Space direction="vertical" size={4}>
            <div>
              <Badge
                status={percentage === 100 ? 'success' : 'processing'}
                text={
                  <Text style={{ fontSize: 12 }}>
                    {stats.completedVisits}/{stats.totalVisits} Visits
                  </Text>
                }
              />
            </div>
            {stats.totalExtra > 0 && (
              <Text type="secondary" style={{ fontSize: 11 }}>
                +{stats.totalExtra} Extra
              </Text>
            )}
          </Space>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="View Details">
            <Button
              type="default"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Service"
            description="Are you sure you want to delete this service?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card bordered={false} style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              <FileTextOutlined style={{ marginRight: 12, color: '#1890ff' }} />
              Service Management
            </Title>
            <Text type="secondary">Manage and track all service contracts and visits</Text>
          </Col>
          <Col>
            <Space size={8}>
              <Button
                icon={<DownloadOutlined />}
                onClick={handleDownloadExcel}
                disabled={services.length === 0}
                size="large"
              >
                Export Excel
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => (window.location.href = '/services/create')}
                size="large"
              >
                Add New Service
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card bordered={false}>
        <Table
          columns={columns}
          dataSource={services}
          rowKey="_id"
          loading={isLoading}
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} services`,
            pageSizeOptions: ['10', '20', '50'],
          }}
        />
      </Card>

      {/* View Details Modal */}
      <Modal
        title={
          <Space>
            <EyeOutlined style={{ color: '#1890ff' }} />
            <span>Service Details</span>
          </Space>
        }
        open={viewModalVisible}
        onCancel={() => {
          setViewModalVisible(false);
          setExpandedVisits({});
        }}
        footer={[
          <Button key="close" onClick={() => { setViewModalVisible(false); setExpandedVisits({}); }}>
            Close
          </Button>,
          <Button key="export" icon={<DownloadOutlined />} onClick={handleExportPDF}>
            Download as PDF
          </Button>,
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              // close view then open edit safely
              setViewModalVisible(false);
              setTimeout(() => {
                if (selectedService) handleEdit(selectedService);
              }, 250);
            }}
          >
            Edit Service
          </Button>,
        ]}
        width={900}
      >
        {selectedService && (
          <div ref={printRef} style={{ background: '#ffffff', padding: 16 }}>
            {/* Client Information */}
            <Card size="small" title="Client Information" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
                    Client Name
                  </Text>
                  <Text strong>{selectedService.clientName}</Text>
                </Col>
                <Col span={6}>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
                    GST
                  </Text>
                  <Tag color="green">{selectedService.gstPercentage}%</Tag>
                </Col>
                <Col span={6}>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
                    Billing Type
                  </Text>
                  <Tag color="blue">{selectedService.billingType}</Tag>
                </Col>
                <Col span={12}>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
                    Work Address
                  </Text>
                  <Text>{selectedService.workAddress}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
                    Billing Address
                  </Text>
                  <Text>{selectedService.billingAddress}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
                    Service Start Date
                  </Text>
                  <Text strong>{dayjs(selectedService.serviceStartDate).format('DD MMMM YYYY')}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
                    Service End Date
                  </Text>
                  <Text strong>{dayjs(selectedService.serviceEndDate).format('DD MMMM YYYY')}</Text>
                </Col>
              </Row>
            </Card>

            {/* Services Details */}
            <Card size="small" title="Services Provided">
              {selectedService.services.map((serviceGroup, sgIdx) => (
                <Card
                  key={sgIdx}
                  type="inner"
                  size="small"
                  title={
                    <Tag color="purple" style={{ fontSize: 14 }}>
                      {serviceGroup.mainService}
                    </Tag>
                  }
                  style={{ marginBottom: 12 }}
                >
                  {serviceGroup.subServices.map((subService, ssIdx) => {
                    const completedVisits = subService.visits?.filter((v) => v.completed).length || 0;
                    const totalVisits = subService.visits?.length || 0;

                    // unique id per subService for expanded state
                    const visitListKey = `${selectedService._id}-${sgIdx}-${ssIdx}`;
                    const isExpanded = !!expandedVisits[visitListKey];
                    const visitsToShow = isExpanded ? subService.visits : subService.visits?.slice(0, 4) || [];

                    return (
                      <Card key={ssIdx} size="small" style={{ marginBottom: 8, border: '1px solid #e8e8e8' }}>
                        <Row gutter={[16, 8]} align="middle">
                          <Col span={8}>
                            <Text strong style={{ fontSize: 13 }}>
                              {subService.subServiceName}
                            </Text>
                          </Col>
                          <Col span={6}>
                            <Tag color="blue">{subService.frequency}</Tag>
                          </Col>
                          <Col span={6}>
                            <Badge status={completedVisits === totalVisits ? 'success' : 'processing'} text={`${completedVisits}/${totalVisits} Visits`} />
                          </Col>
                        </Row>

                        {subService.visits && subService.visits.length > 0 && (
                          <div style={{ marginTop: 12 }}>
                            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                              Visit Schedule:
                            </Text>

                            <Row gutter={[8, 8]}>
                              {visitsToShow.map((visit, vIdx) => (
                                <Col span={12} key={`${visit.visitNumber ?? vIdx}-${vIdx}`}>
                                  <div
                                    style={{
                                      padding: '6px 8px',
                                      background: visit.completed ? '#f6ffed' : '#fafafa',
                                      border: `1px solid ${visit.completed ? '#b7eb8f' : '#d9d9d9'}`,
                                      borderRadius: 4,
                                      fontSize: 11,
                                    }}
                                  >
                                    <Space size={4}>
                                      <Badge status={visit.completed ? 'success' : 'default'} />
                                      <Text style={{ fontSize: 11 }}>Visit {visit.visitNumber}</Text>
                                      {visit.date && <Text type="secondary" style={{ fontSize: 11 }}>- {dayjs(visit.date).format('DD/MM/YY')}</Text>}
                                      {visit.person && (
                                        <Text style={{ fontSize: 11 }}>
                                          <UserOutlined style={{ fontSize: 10, marginRight: 2 }} />
                                          {visit.person}
                                        </Text>
                                      )}
                                    </Space>
                                  </div>
                                </Col>
                              ))}
                            </Row>

                            {subService.visits.length > 4 && (
                              <div style={{ marginTop: 8 }}>
                                <Button type="link" onClick={() => toggleExpandedVisits(visitListKey)} style={{ padding: 0 }}>
                                  {isExpanded ? 'Show less' : `+${subService.visits.length - 4} more visits`}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {subService.extraServices && subService.extraServices.some((e) => e.description || e.date) && (
                          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed #d9d9d9' }}>
                            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                              Extra Services:
                            </Text>
                            {subService.extraServices
                              .filter((e) => e.description || e.date)
                              .map((extra, eIdx) => (
                                <div
                                  key={eIdx}
                                  style={{
                                    padding: '4px 8px',
                                    background: '#fffbe6',
                                    border: '1px solid #ffe58f',
                                    borderRadius: 4,
                                    fontSize: 11,
                                    marginBottom: 4,
                                  }}
                                >
                                  <Space size={4}>
                                    <Tag color="orange" style={{ fontSize: 10, padding: '0 4px' }}>
                                      E{eIdx + 1}
                                    </Tag>
                                    <Text style={{ fontSize: 11 }}>{extra.description}</Text>
                                    {extra.date && <Text type="secondary" style={{ fontSize: 11 }}>- {dayjs(extra.date).format('DD/MM/YY')}</Text>}
                                    {extra.person && (
                                      <Text style={{ fontSize: 11 }}>
                                        <UserOutlined style={{ fontSize: 10, marginRight: 2 }} />
                                        {extra.person}
                                      </Text>
                                    )}
                                  </Space>
                                </div>
                              ))}
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </Card>
              ))}
            </Card>
          </div>
        )}
      </Modal>

      {/* Edit Modal with Visit Tracking */}
      <Modal
        title={
          <Space>
            <EditOutlined style={{ color: '#1890ff' }} />
            <span>Edit Service & Update Visits</span>
          </Space>
        }
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={1200}
        forceRender={true} // ensure nested Form.List mounts even when modal closed
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Card size="small" title="Client Information" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="clientName" label="Client Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="gstPercentage" label="GST %" rules={[{ required: true }]}>
                  <InputNumber min={0} max={28} style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="billingType" label="Billing Type" rules={[{ required: true }]}>
                  <Select>
                    <Select.Option value="service">Service to Service</Select.Option>
                    <Select.Option value="monthly">Monthly</Select.Option>
                    <Select.Option value="quarterly">Quarterly</Select.Option>
                    <Select.Option value="yearly">Yearly</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="serviceStartDate" label="Start Date" rules={[{ required: true }]}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="serviceEndDate" label="End Date" rules={[{ required: true }]}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="workAddress" label="Work Address" rules={[{ required: true }]}>
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="billingAddress" label="Billing Address" rules={[{ required: true }]}>
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card size="small" title="Services, Visits & Extra Services">
            <Form.List name="services">
              {(serviceFields, { add: addService, remove: removeService }) => (
                <>
                  {serviceFields.map(({ key, name: serviceName }) => (
                    <Card key={key} type="inner" size="small" style={{ marginBottom: 16, backgroundColor: '#fafafa' }}>
                      <Space align="start" style={{ display: 'flex', marginBottom: 12 }}>
                        <Form.Item name={[serviceName, 'mainService']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                          <Select placeholder="Main Service" style={{ width: 200 }}>
                            {mainServices.map((ms) => (
                              <Select.Option key={ms} value={ms}>
                                {ms}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Button danger size="small" onClick={() => removeService(serviceName)}>
                          Remove Main Service
                        </Button>
                      </Space>

                      <Form.List name={[serviceName, 'subServices']}>
                        {(subFields, { add: addSub, remove: removeSub }) => (
                          <>
                            {subFields.map(({ key: subKey, name: subName }) => (
                              <Card
                                key={subKey}
                                size="small"
                                style={{ marginBottom: 12, backgroundColor: '#fff', border: '2px solid #1890ff' }}
                              >
                                {/* Sub Service Header */}
                                <Row gutter={8} align="middle" style={{ marginBottom: 12 }}>
                                  <Col span={7}>
                                    <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Sub Service</Text>
                                    <Form.Item name={[subName, 'subServiceName']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                      <Select placeholder="Sub Service" style={{ width: '100%' }}>
                                        {subServices.map((ss) => (
                                          <Select.Option key={ss} value={ss}>
                                            {ss}
                                          </Select.Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  </Col>

                                  <Col span={5}>
                                    <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Frequency</Text>
                                    <Form.Item name={[subName, 'frequency']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                      <Select placeholder="Frequency" style={{ width: '100%' }}>
                                        {frequencyOptions.map((freq) => (
                                          <Select.Option key={freq.value} value={freq.value}>
                                            {freq.label}
                                          </Select.Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  </Col>

                                  <Col span={4}>
                                    <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Total Visits</Text>
                                    <Form.Item name={[subName, 'plannedCount']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                      <InputNumber min={1} placeholder="Count" style={{ width: '100%' }} />
                                    </Form.Item>
                                  </Col>

                                  <Col span={8} style={{ textAlign: 'right', paddingTop: 22 }}>
                                    <Button danger size="small" onClick={() => removeSub(subName)}>Remove Sub Service</Button>
                                  </Col>
                                </Row>

                                <Divider style={{ margin: '12px 0' }} />

                                {/* VISIT TRACKING SECTION */}
                                <div style={{ marginBottom: 16 }}>
                                  <div style={{ backgroundColor: '#e6f7ff', padding: '8px 12px', borderRadius: 4, marginBottom: 12 }}>
                                    <CalendarOutlined style={{ marginRight: 8 }} />
                                    <Text strong style={{ fontSize: 14 }}>Update Visit Tracking</Text>
                                  </div>

                                  <Form.List name={[subName, 'visits']}>
                                    {(visitFields) => (
                                      <Row gutter={[8, 8]}>
                                        {visitFields.map(({ key: visitKey, name: visitName }, visitIndex) => {
                                          const currentDate = form.getFieldValue(['services', serviceName, 'subServices', subName, 'visits', visitName, 'date']);
                                          const currentPerson = form.getFieldValue(['services', serviceName, 'subServices', subName, 'visits', visitName, 'person']);
                                          const isCompleted = !!(currentDate && currentPerson);

                                          return (
                                            <Col span={12} key={visitKey}>
                                              <Card
                                                size="small"
                                                style={{
                                                  border: isCompleted ? '2px solid #52c41a' : '1px solid #d9d9d9',
                                                  backgroundColor: isCompleted ? '#f6ffed' : '#fafafa',
                                                }}
                                              >
                                                <Row gutter={8} align="middle">
                                                  <Col span={3}>
                                                    <div
                                                      style={{
                                                        width: 36,
                                                        height: 36,
                                                        borderRadius: '6px',
                                                        backgroundColor: isCompleted ? '#52c41a' : '#d9d9d9',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#fff',
                                                        fontWeight: 'bold',
                                                        fontSize: 14,
                                                      }}
                                                    >
                                                      {visitIndex + 1}
                                                    </div>
                                                  </Col>

                                                  <Col span={10}>
                                                    <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>Visit Date</Text>
                                                    <Form.Item name={[visitName, 'date']} style={{ marginBottom: 0 }}>
                                                      <DatePicker style={{ width: '100%' }} placeholder="Select date" size="small" format="DD-MM-YYYY" />
                                                    </Form.Item>
                                                  </Col>

                                                  <Col span={9}>
                                                    <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>Person Name</Text>
                                                    <Form.Item name={[visitName, 'person']} style={{ marginBottom: 0 }}>
                                                      <Input placeholder="Person" prefix={<UserOutlined style={{ fontSize: 12 }} />} size="small" />
                                                    </Form.Item>
                                                  </Col>

                                                  <Col span={2} style={{ textAlign: 'center' }}>
                                                    {isCompleted ? (
                                                      <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
                                                    ) : (
                                                      <CloseCircleOutlined style={{ fontSize: 20, color: '#d9d9d9' }} />
                                                    )}
                                                  </Col>

                                                  <Form.Item name={[visitName, 'visitNumber']} hidden initialValue={visitIndex + 1}><Input type="hidden" /></Form.Item>
                                                </Row>
                                              </Card>
                                            </Col>
                                          );
                                        })}
                                      </Row>
                                    )}
                                  </Form.List>
                                </div>

                                {/* EXTRA SERVICES SECTION */}
                                <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fffbe6', borderRadius: 6 }}>
                                  <div style={{ marginBottom: 12 }}>
                                    <Text strong style={{ fontSize: 14 }}>Update Extra Services</Text>
                                    <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>- Add or update additional services</Text>
                                  </div>

                                  <Form.List name={[subName, 'extraServices']}>
                                    {(extraFields, { add: addExtra, remove: removeExtra }) => (
                                      <>
                                        {extraFields.map(({ key: extraKey, name: extraName }, extraIndex) => {
                                          const currentDesc = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'description']);
                                          const currentExtraDate = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'date']);
                                          const currentExtraPerson = form.getFieldValue(['services', serviceName, 'subServices', subName, 'extraServices', extraName, 'person']);
                                          const isExtraComplete = !!(currentDesc && currentExtraDate && currentExtraPerson);

                                          return (
                                            <Card key={extraKey} size="small" style={{ marginBottom: 8, backgroundColor: '#fff' }}>
                                              <Row gutter={8} align="middle">
                                                <Col span={2}>
                                                  <div
                                                    style={{
                                                      width: 32,
                                                      height: 32,
                                                      borderRadius: '6px',
                                                      backgroundColor: isExtraComplete ? '#faad14' : '#d9d9d9',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      color: '#fff',
                                                      fontWeight: 'bold',
                                                      fontSize: 13,
                                                    }}
                                                  >
                                                    E{extraIndex + 1}
                                                  </div>
                                                </Col>

                                                <Col span={8}>
                                                  <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>Service Description</Text>
                                                  <Form.Item name={[extraName, 'description']} style={{ marginBottom: 0 }}>
                                                    <Input placeholder={`Extra service ${extraIndex + 1} description`} size="small" />
                                                  </Form.Item>
                                                </Col>

                                                <Col span={5}>
                                                  <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>Date</Text>
                                                  <Form.Item name={[extraName, 'date']} style={{ marginBottom: 0 }}>
                                                    <DatePicker placeholder="Date" style={{ width: '100%' }} size="small" format="DD-MM-YYYY" />
                                                  </Form.Item>
                                                </Col>

                                                <Col span={6}>
                                                  <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>Person Name</Text>
                                                  <Form.Item name={[extraName, 'person']} style={{ marginBottom: 0 }}>
                                                    <Input placeholder="Person name" size="small" prefix={<UserOutlined style={{ fontSize: 12 }} />} />
                                                  </Form.Item>
                                                </Col>

                                                <Col span={3} style={{ textAlign: 'center' }}>
                                                  {isExtraComplete ? (
                                                    <CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />
                                                  ) : (
                                                    <Button danger size="small" type="text" onClick={() => removeExtra(extraName)} icon={<DeleteOutlined />} />
                                                  )}
                                                </Col>
                                              </Row>
                                            </Card>
                                          );
                                        })}

                                        <Button type="dashed" size="small" onClick={() => addExtra()} icon={<PlusOutlined />} style={{ marginTop: 4 }}>
                                          Add Extra Service
                                        </Button>
                                      </>
                                    )}
                                  </Form.List>
                                </div>
                              </Card>
                            ))}

                            <Button type="dashed" size="small" onClick={() => addSub()} icon={<PlusOutlined />} style={{ marginTop: 8 }}>
                              Add Sub Service
                            </Button>
                          </>
                        )}
                      </Form.List>
                    </Card>
                  ))}

                  <Button type="dashed" onClick={() => addService()} icon={<PlusOutlined />} size="large">
                    Add Main Service
                  </Button>
                </>
              )}
            </Form.List>
          </Card>

          <Form.Item style={{ marginTop: 16, marginBottom: 0 }}>
            <Row justify="end">
              <Space size={8}>
                <Button onClick={() => { setEditModalVisible(false); form.resetFields(); }} size="large">Cancel</Button>
                <Button type="primary" htmlType="submit" loading={isUpdating} size="large" icon={<EditOutlined />}>
                  {isUpdating ? 'Updating...' : 'Update Service & Visits'}
                </Button>
              </Space>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceManagement;