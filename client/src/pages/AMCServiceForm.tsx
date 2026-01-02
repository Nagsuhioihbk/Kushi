// import {
//   Button,
//   Card,
//   Col,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Row,
//   Select,
//   Space,
//   Typography,
// } from 'antd';
// import { SpinnerIcon } from '@phosphor-icons/react';
// import toastMessage from '../lib/toastMessage';
// import { useCreateServiceMutation } from '../redux/features/management/serviceApi';

// const { Title } = Typography;

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

// const ServiceForm = () => {
//   const [form] = Form.useForm();
//   const [createService, { isLoading: isCreatingService }] = useCreateServiceMutation();

//   const onFinish = async (values: any) => {
//     const payload = {
//       ...values,
//       serviceStartDate: values.serviceStartDate?.toISOString(),
//       serviceEndDate: values.serviceEndDate?.toISOString(),
//     };

//     try {
//       const res = await createService(payload).unwrap();
//       if (res.statusCode === 201) {
//         toastMessage({ icon: 'success', text: res.message });
//         form.resetFields();
//       }
//     } catch (error: any) {
//       toastMessage({ icon: 'error', text: error.data?.message || 'Failed to create service' });
//     }
//   };

//   return (
//     <Card>
//       <Title level={3}>Service Details Form</Title>

//       <Form 
//         layout="vertical" 
//         form={form} 
//         initialValues={{ services: [] }}
//         onFinish={onFinish}
//       >
//         {/* CLIENT DETAILS */}
//         <Card title="Client Information" bordered={false}>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item name="clientName" label="Client Name" rules={[{ required: true }]}>
//                 <Input />
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item name="gstPercentage" label="GST (%)" rules={[{ required: true }]}>
//                 <InputNumber min={0} max={28} style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item name="billingType" label="Billing Type" rules={[{ required: true }]}>
//                 <Select placeholder="Select billing type">
//                   <Select.Option value="service">Service to Service</Select.Option>
//                   <Select.Option value="monthly">Monthly</Select.Option>
//                   <Select.Option value="quarterly">Quarterly</Select.Option>
//                   <Select.Option value="yearly">Yearly</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item name="workAddress" label="Work Address" rules={[{ required: true }]}>
//                 <Input.TextArea rows={2} />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item name="billingAddress" label="Billing Address" rules={[{ required: true }]}>
//                 <Input.TextArea rows={2} />
//               </Form.Item>
//             </Col>

//             <Col span={6}>
//               <Form.Item name="serviceStartDate" label="Service Start Date" rules={[{ required: true }]}>
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>

//             <Col span={6}>
//               <Form.Item name="serviceEndDate" label="Service End Date" rules={[{ required: true }]}>
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Card>

//         {/* SERVICES */}
//         <Card title="Services Provided" bordered={false}>
//           <Form.List name="services">
//             {(serviceFields, { add: addService, remove: removeService }) => (
//               <>
//                 {serviceFields.map(({ key, name }) => (
//                   <Card key={key} type="inner" style={{ marginBottom: 16 }}>
//                     <Space align="start" style={{ display: 'flex', marginBottom: 12 }}>
//                       <Form.Item
//                         name={[name, 'mainService']}
//                         rules={[{ required: true }]}
//                       >
//                         <Select placeholder="Main Service" style={{ width: 240 }}>
//                           {mainServices.map(ms => (
//                             <Select.Option key={ms} value={ms}>
//                               {ms}
//                             </Select.Option>
//                           ))}
//                         </Select>
//                       </Form.Item>

//                       <Button danger onClick={() => removeService(name)}>
//                         Remove Main Service
//                       </Button>
//                     </Space>

//                     {/* SUB SERVICES */}
//                     <Form.List name={[name, 'subServices']} initialValue={[]}>
//                       {(subFields, { add: addSub, remove: removeSub }) => (
//                         <>
//                           {subFields.map(({ key: subKey, name: subName }) => (
//                             <Space
//                               key={subKey}
//                               align="start"
//                               style={{ display: 'flex', marginBottom: 8 }}
//                             >
//                               <Form.Item
//                                 name={[subName, 'subServiceName']}
//                                 rules={[{ required: true }]}
//                               >
//                                 <Select placeholder="Sub Service" style={{ width: 220 }}>
//                                   {subServices.map(ss => (
//                                     <Select.Option key={ss} value={ss}>
//                                       {ss}
//                                     </Select.Option>
//                                   ))}
//                                 </Select>
//                               </Form.Item>

//                               <Form.Item
//                                 name={[subName, 'frequency']}
//                                 rules={[{ required: true }]}
//                               >
//                                 <Select
//                                   placeholder="Frequency"
//                                   style={{ width: 200 }}
//                                   onChange={(value) => {
//                                     const freq = frequencyOptions.find(f => f.value === value);
//                                     if (!freq) return;

//                                     const services = form.getFieldValue('services') || [];
//                                     services[name].subServices[subName] = {
//                                       ...services[name].subServices[subName],
//                                       plannedCount: freq.count,
//                                     };

//                                     form.setFieldsValue({ services });
//                                   }}
//                                 >
//                                   {frequencyOptions.map(freq => (
//                                     <Select.Option key={freq.value} value={freq.value}>
//                                       {freq.label}
//                                     </Select.Option>
//                                   ))}
//                                 </Select>
//                               </Form.Item>

//                               <Form.Item
//                                 name={[subName, 'plannedCount']}
//                                 rules={[{ required: true }]}
//                               >
//                                 <InputNumber min={1} placeholder="Count" />
//                               </Form.Item>

//                               <Button danger onClick={() => removeSub(subName)}>
//                                 Remove
//                               </Button>
//                             </Space>
//                           ))}

//                           <Button type="dashed" onClick={() => addSub()}>
//                             + Add Sub Service
//                           </Button>
//                         </>
//                       )}
//                     </Form.List>
//                   </Card>
//                 ))}

//                 <Button type="dashed" onClick={() => addService()}>
//                   + Add Main Service
//                 </Button>
//               </>
//             )}
//           </Form.List>
//         </Card>

//         {/* SAVE */}
//         <Row justify="end">
//           <Button 
//             type="primary" 
//             htmlType="submit" 
//             disabled={isCreatingService}
//             style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
//           >
//             {isCreatingService && <SpinnerIcon className='spin' weight='bold' />}
//             Save Service Details
//           </Button>
//         </Row>
//       </Form>
//     </Card>
//   );
// };

// export default ServiceForm;





// import { useState } from 'react';
// import {
//   Button,
//   Card,
//   Col,
//   DatePicker,
//   Input,
//   InputNumber,
//   Row,
//   Select,
//   Space,
//   Typography,
//   Tag,
//   Divider,
//   message,
// } from 'antd';
// import { CheckCircle, XCircle, Calendar, User, Plus, Trash2, Save, RotateCcw } from 'lucide-react';
// import { useCreateServiceMutation } from '../redux/features/management/serviceApi';

// const { Title, Text } = Typography;

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

// const ServiceForm = () => {
//   const [formData, setFormData] = useState({
//     clientName: '',
//     gstPercentage: '',
//     billingType: '',
//     workAddress: '',
//     billingAddress: '',
//     serviceStartDate: null,
//     serviceEndDate: null,
//     services: [],
//   });

//   const [createService, { isLoading }] = useCreateServiceMutation();

//   const updateFormData = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const addMainService = () => {
//     setFormData(prev => ({
//       ...prev,
//       services: [...prev.services, { mainService: '', subServices: [] }]
//     }));
//   };

//   const removeMainService = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.filter((_, i) => i !== index)
//     }));
//   };

//   const updateMainService = (index, value) => {
//     setFormData(prev => {
//       const services = [...prev.services];
//       services[index].mainService = value;
//       return { ...prev, services };
//     });
//   };

//   const addSubService = (serviceIndex) => {
//     setFormData(prev => {
//       const services = [...prev.services];
//       services[serviceIndex].subServices.push({
//         subServiceName: '',
//         frequency: '',
//         plannedCount: 0,
//         visits: [],
//         extraServices: [
//           { description: '', date: null, person: '' },
//           { description: '', date: null, person: '' },
//           { description: '', date: null, person: '' }
//         ]
//       });
//       return { ...prev, services };
//     });
//   };

//   const removeSubService = (serviceIndex, subServiceIndex) => {
//     setFormData(prev => {
//       const services = [...prev.services];
//       services[serviceIndex].subServices = services[serviceIndex].subServices.filter(
//         (_, i) => i !== subServiceIndex
//       );
//       return { ...prev, services };
//     });
//   };

//   const updateSubService = (serviceIndex, subServiceIndex, field, value) => {
//     setFormData(prev => {
//       const services = [...prev.services];
//       services[serviceIndex].subServices[subServiceIndex][field] = value;
      
//       if (field === 'frequency') {
//         const freq = frequencyOptions.find(f => f.value === value);
//         if (freq) {
//           services[serviceIndex].subServices[subServiceIndex].plannedCount = freq.count;
//           services[serviceIndex].subServices[subServiceIndex].visits = 
//             Array(freq.count).fill(null).map((_, idx) => ({ 
//               visitNumber: idx + 1,
//               date: null, 
//               person: '',
//               completed: false 
//             }));
//         }
//       }
      
//       if (field === 'plannedCount') {
//         services[serviceIndex].subServices[subServiceIndex].visits = 
//           Array(value || 0).fill(null).map((_, idx) => ({ 
//             visitNumber: idx + 1,
//             date: null, 
//             person: '',
//             completed: false 
//           }));
//       }
      
//       return { ...prev, services };
//     });
//   };

//   const updateVisit = (serviceIndex, subServiceIndex, visitIndex, field, value) => {
//     setFormData(prev => {
//       const services = [...prev.services];
//       services[serviceIndex].subServices[subServiceIndex].visits[visitIndex][field] = value;
      
//       const visit = services[serviceIndex].subServices[subServiceIndex].visits[visitIndex];
//       if (visit.date && visit.person) {
//         visit.completed = true;
//       } else {
//         visit.completed = false;
//       }
      
//       return { ...prev, services };
//     });
//   };

//   const addExtraService = (serviceIndex, subServiceIndex) => {
//     setFormData(prev => {
//       const services = [...prev.services];
//       services[serviceIndex].subServices[subServiceIndex].extraServices.push({
//         description: '',
//         date: null,
//         person: ''
//       });
//       return { ...prev, services };
//     });
//   };

//   const removeExtraService = (serviceIndex, subServiceIndex, extraIndex) => {
//     setFormData(prev => {
//       const services = [...prev.services];
//       services[serviceIndex].subServices[subServiceIndex].extraServices = 
//         services[serviceIndex].subServices[subServiceIndex].extraServices.filter(
//           (_, i) => i !== extraIndex
//         );
//       return { ...prev, services };
//     });
//   };

//   const updateExtraService = (serviceIndex, subServiceIndex, extraIndex, field, value) => {
//     setFormData(prev => {
//       const services = [...prev.services];
//       services[serviceIndex].subServices[subServiceIndex].extraServices[extraIndex][field] = value;
//       return { ...prev, services };
//     });
//   };

//   const handleSave = async () => {
//     console.log('=== SAVE BUTTON CLICKED ===');
//     console.log('Current formData:', formData);

//     // Validation
//     if (!formData.clientName || !formData.gstPercentage || !formData.billingType || 
//         !formData.workAddress || !formData.billingAddress || 
//         !formData.serviceStartDate || !formData.serviceEndDate) {
//       console.error('Validation failed: Missing client information');
//       message.error('Please fill all client information fields');
//       return;
//     }

//     if (formData.services.length === 0) {
//       console.error('Validation failed: No services added');
//       message.error('Please add at least one service');
//       return;
//     }

//     // Validate services
//     for (let service of formData.services) {
//       if (!service.mainService) {
//         console.error('Validation failed: Missing main service');
//         message.error('Please select main service for all services');
//         return;
//       }
//       if (service.subServices.length === 0) {
//         console.error('Validation failed: No sub services');
//         message.error('Please add at least one sub service');
//         return;
//       }
//       for (let subService of service.subServices) {
//         if (!subService.subServiceName || !subService.frequency || !subService.plannedCount) {
//           console.error('Validation failed: Incomplete sub service', subService);
//           message.error('Please fill all sub service details');
//           return;
//         }
//       }
//     }

//     console.log('✅ All validations passed');

//     // Prepare payload - properly convert dates
//     const payload = {
//       clientName: formData.clientName,
//       gstPercentage: formData.gstPercentage,
//       billingType: formData.billingType,
//       workAddress: formData.workAddress,
//       billingAddress: formData.billingAddress,
//       serviceStartDate: formData.serviceStartDate.toISOString(),
//       serviceEndDate: formData.serviceEndDate.toISOString(),
//       services: formData.services.map(service => ({
//         mainService: service.mainService,
//         subServices: service.subServices.map(subService => ({
//           subServiceName: subService.subServiceName,
//           frequency: subService.frequency,
//           plannedCount: subService.plannedCount,
//           visits: subService.visits.map(visit => ({
//             visitNumber: visit.visitNumber,
//             date: visit.date ? visit.date.toISOString() : null,
//             person: visit.person || '',
//             completed: visit.completed || false,
//           })),
//           extraServices: subService.extraServices
//             .filter(extra => extra.description || extra.date || extra.person)
//             .map(extra => ({
//               description: extra.description || '',
//               date: extra.date ? extra.date.toISOString() : null,
//               person: extra.person || '',
//             })),
//         })),
//       })),
//     };

//     console.log('📤 Payload to send:', JSON.stringify(payload, null, 2));

//     try {
//       console.log('🔄 Calling createService API...');
//       const response = await createService(payload).unwrap();
//       console.log('✅ Success! Response:', response);
//       message.success('Service details saved successfully!');
      
//       // Reset form after successful save
//       setFormData({
//         clientName: '',
//         gstPercentage: '',
//         billingType: '',
//         workAddress: '',
//         billingAddress: '',
//         serviceStartDate: null,
//         serviceEndDate: null,
//         services: [],
//       });
//     } catch (error) {
//       console.error('❌ Error saving service:', error);
//       console.error('Full error object:', JSON.stringify(error, null, 2));
//       message.error(error?.data?.message || error?.message || 'Failed to save service details');
//     }
//   };

//   const clearForm = () => {
//     setFormData({
//       clientName: '',
//       gstPercentage: '',
//       billingType: '',
//       workAddress: '',
//       billingAddress: '',
//       serviceStartDate: null,
//       serviceEndDate: null,
//       services: [],
//     });
//     message.info('Form cleared');
//   };

//   return (
//     <div style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
//       <Card>
//         <Title level={3}>Service Management Form</Title>

//         {/* CLIENT DETAILS */}
//         <Card title="Client Information" style={{ marginBottom: 16 }}>
//           <Row gutter={16}>
//             <Col span={8}>
//               <div style={{ marginBottom: 16 }}>
//                 <Text strong>Client Name <span style={{ color: 'red' }}>*</span></Text>
//                 <Input
//                   value={formData.clientName}
//                   onChange={(e) => updateFormData('clientName', e.target.value)}
//                   placeholder="Enter client name"
//                   style={{ marginTop: 8 }}
//                 />
//               </div>
//             </Col>

//             <Col span={8}>
//               <div style={{ marginBottom: 16 }}>
//                 <Text strong>GST (%) <span style={{ color: 'red' }}>*</span></Text>
//                 <InputNumber
//                   value={formData.gstPercentage}
//                   onChange={(value) => updateFormData('gstPercentage', value)}
//                   min={0}
//                   max={28}
//                   style={{ width: '100%', marginTop: 8 }}
//                   placeholder="Enter GST %"
//                 />
//               </div>
//             </Col>

//             <Col span={8}>
//               <div style={{ marginBottom: 16 }}>
//                 <Text strong>Billing Type <span style={{ color: 'red' }}>*</span></Text>
//                 <Select
//                   value={formData.billingType}
//                   onChange={(value) => updateFormData('billingType', value)}
//                   placeholder="Select billing type"
//                   style={{ width: '100%', marginTop: 8 }}
//                 >
//                   <Select.Option value="service">Service to Service</Select.Option>
//                   <Select.Option value="monthly">Monthly</Select.Option>
//                   <Select.Option value="quarterly">Quarterly</Select.Option>
//                   <Select.Option value="yearly">Yearly</Select.Option>
//                 </Select>
//               </div>
//             </Col>

//             <Col span={12}>
//               <div style={{ marginBottom: 16 }}>
//                 <Text strong>Work Address <span style={{ color: 'red' }}>*</span></Text>
//                 <Input.TextArea
//                   value={formData.workAddress}
//                   onChange={(e) => updateFormData('workAddress', e.target.value)}
//                   rows={2}
//                   placeholder="Enter work address"
//                   style={{ marginTop: 8 }}
//                 />
//               </div>
//             </Col>

//             <Col span={12}>
//               <div style={{ marginBottom: 16 }}>
//                 <Text strong>Billing Address <span style={{ color: 'red' }}>*</span></Text>
//                 <Input.TextArea
//                   value={formData.billingAddress}
//                   onChange={(e) => updateFormData('billingAddress', e.target.value)}
//                   rows={2}
//                   placeholder="Enter billing address"
//                   style={{ marginTop: 8 }}
//                 />
//               </div>
//             </Col>

//             <Col span={6}>
//               <div style={{ marginBottom: 16 }}>
//                 <Text strong>AMC Start Date <span style={{ color: 'red' }}>*</span></Text>
//                 <DatePicker
//                   value={formData.serviceStartDate}
//                   onChange={(date) => updateFormData('serviceStartDate', date)}
//                   style={{ width: '100%', marginTop: 8 }}
//                 />
//               </div>
//             </Col>

//             <Col span={6}>
//               <div style={{ marginBottom: 16 }}>
//                 <Text strong>AMC End Date <span style={{ color: 'red' }}>*</span></Text>
//                 <DatePicker
//                   value={formData.serviceEndDate}
//                   onChange={(date) => updateFormData('serviceEndDate', date)}
//                   style={{ width: '100%', marginTop: 8 }}
//                 />
//               </div>
//             </Col>
//           </Row>
//         </Card>

//         {/* SERVICES */}
//         <Card title="Services Provided" style={{ marginBottom: 16 }}>
//           {formData.services.map((service, serviceIndex) => (
//             <Card 
//               key={serviceIndex} 
//               type="inner" 
//               style={{ marginBottom: 16, backgroundColor: '#fafafa' }}
//             >
//               <Space align="start" style={{ display: 'flex', marginBottom: 12 }}>
//                 <Select
//                   value={service.mainService}
//                   onChange={(value) => updateMainService(serviceIndex, value)}
//                   placeholder="Select Main Service"
//                   style={{ width: 240 }}
//                 >
//                   {mainServices.map(ms => (
//                     <Select.Option key={ms} value={ms}>{ms}</Select.Option>
//                   ))}
//                 </Select>

//                 <Button 
//                   danger 
//                   onClick={() => removeMainService(serviceIndex)}
//                   icon={<Trash2 size={16} />}
//                 >
//                   Remove Main Service
//                 </Button>
//               </Space>

//               {/* SUB SERVICES */}
//               {service.subServices.map((subService, subServiceIndex) => {
//                 const completedVisits = subService.visits.filter(v => v.completed).length;
//                 const totalVisits = subService.plannedCount || 0;

//                 return (
//                   <Card
//                     key={subServiceIndex}
//                     size="small"
//                     style={{ marginBottom: 16, backgroundColor: '#fff', border: '2px solid #1890ff' }}
//                   >
//                     {/* Sub Service Header */}
//                     <Row gutter={8} align="middle" style={{ marginBottom: 16 }}>
//                       <Col span={7}>
//                         <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
//                           Sub Service
//                         </Text>
//                         <Select
//                           value={subService.subServiceName}
//                           onChange={(value) => 
//                             updateSubService(serviceIndex, subServiceIndex, 'subServiceName', value)
//                           }
//                           placeholder="Select Sub Service"
//                           style={{ width: '100%' }}
//                         >
//                           {subServices.map(ss => (
//                             <Select.Option key={ss} value={ss}>{ss}</Select.Option>
//                           ))}
//                         </Select>
//                       </Col>

//                       <Col span={6}>
//                         <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
//                           Frequency
//                         </Text>
//                         <Select
//                           value={subService.frequency}
//                           onChange={(value) => 
//                             updateSubService(serviceIndex, subServiceIndex, 'frequency', value)
//                           }
//                           placeholder="Select Frequency"
//                           style={{ width: '100%' }}
//                         >
//                           {frequencyOptions.map(freq => (
//                             <Select.Option key={freq.value} value={freq.value}>
//                               {freq.label}
//                             </Select.Option>
//                           ))}
//                         </Select>
//                       </Col>

//                       <Col span={4}>
//                         <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
//                           Total Visits
//                         </Text>
//                         <InputNumber
//                           value={subService.plannedCount}
//                           onChange={(value) => 
//                             updateSubService(serviceIndex, subServiceIndex, 'plannedCount', value)
//                           }
//                           min={1}
//                           placeholder="Count"
//                           style={{ width: '100%' }}
//                         />
//                       </Col>

//                       <Col span={4}>
//                         {totalVisits > 0 && (
//                           <div>
//                             <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
//                               Progress
//                             </Text>
//                             <Tag color={completedVisits === totalVisits ? 'success' : 'processing'} style={{ fontSize: 13 }}>
//                               {completedVisits} / {totalVisits} Done
//                             </Tag>
//                           </div>
//                         )}
//                       </Col>

//                       <Col span={3} style={{ textAlign: 'right' }}>
//                         <Button 
//                           danger 
//                           size="small" 
//                           onClick={() => removeSubService(serviceIndex, subServiceIndex)}
//                           icon={<Trash2 size={14} />}
//                           style={{ marginTop: 18 }}
//                         >
//                           Remove
//                         </Button>
//                       </Col>
//                     </Row>

//                     <Divider style={{ margin: '12px 0' }} />

//                     {/* VISIT TRACKING - ALL VISITS SHOWN */}
//                     {totalVisits > 0 && (
//                       <div style={{ marginBottom: 16 }}>
//                         <div style={{ backgroundColor: '#e6f7ff', padding: '8px 12px', borderRadius: 4, marginBottom: 12 }}>
//                           <Calendar size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
//                           <Text strong style={{ fontSize: 14 }}>Visit Tracking - Mark Each Visit</Text>
//                         </div>

//                         <Row gutter={[8, 8]}>
//                           {subService.visits.map((visit, visitIndex) => (
//                             <Col span={12} key={visitIndex}>
//                               <Card 
//                                 size="small" 
//                                 style={{ 
//                                   border: visit.completed ? '2px solid #52c41a' : '1px solid #d9d9d9',
//                                   backgroundColor: visit.completed ? '#f6ffed' : '#fafafa'
//                                 }}
//                               >
//                                 <Row gutter={8} align="middle">
//                                   <Col span={3}>
//                                     <div style={{
//                                       width: 36,
//                                       height: 36,
//                                       borderRadius: '6px',
//                                       backgroundColor: visit.completed ? '#52c41a' : '#d9d9d9',
//                                       display: 'flex',
//                                       alignItems: 'center',
//                                       justifyContent: 'center',
//                                       color: '#fff',
//                                       fontWeight: 'bold',
//                                       fontSize: 14
//                                     }}>
//                                       {visitIndex + 1}
//                                     </div>
//                                   </Col>

//                                   <Col span={10}>
//                                     <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                       Visit Date
//                                     </Text>
//                                     <DatePicker
//                                       value={visit.date}
//                                       onChange={(date) => 
//                                         updateVisit(serviceIndex, subServiceIndex, visitIndex, 'date', date)
//                                       }
//                                       style={{ width: '100%' }}
//                                       placeholder="Select date"
//                                       size="small"
//                                       format="DD-MM-YYYY"
//                                     />
//                                   </Col>

//                                   <Col span={9}>
//                                     <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                       Person Name
//                                     </Text>
//                                     <Input
//                                       value={visit.person}
//                                       onChange={(e) => 
//                                         updateVisit(serviceIndex, subServiceIndex, visitIndex, 'person', e.target.value)
//                                       }
//                                       placeholder="Person name"
//                                       prefix={<User size={12} />}
//                                       size="small"
//                                     />
//                                   </Col>

//                                   <Col span={2} style={{ textAlign: 'center' }}>
//                                     {visit.completed ? (
//                                       <CheckCircle size={20} color="#52c41a" />
//                                     ) : (
//                                       <XCircle size={20} color="#d9d9d9" />
//                                     )}
//                                   </Col>
//                                 </Row>
//                               </Card>
//                             </Col>
//                           ))}
//                         </Row>
//                       </div>
//                     )}

//                     {/* EXTRA SERVICES - 3 DEFAULT */}
//                     <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fffbe6', borderRadius: 6 }}>
//                       <div style={{ marginBottom: 12 }}>
//                         <Text strong style={{ fontSize: 14 }}>Extra Services (Additional)</Text>
//                         <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>
//                           - 3 extra service slots available for customer requests
//                         </Text>
//                       </div>
                      
//                       {subService.extraServices.map((extra, extraIndex) => (
//                         <Card key={extraIndex} size="small" style={{ marginBottom: 8, backgroundColor: '#fff' }}>
//                           <Row gutter={8} align="middle">
//                             <Col span={2}>
//                               <div style={{
//                                 width: 32,
//                                 height: 32,
//                                 borderRadius: '6px',
//                                 backgroundColor: (extra.description && extra.date && extra.person) ? '#faad14' : '#d9d9d9',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 color: '#fff',
//                                 fontWeight: 'bold',
//                                 fontSize: 13
//                               }}>
//                                 E{extraIndex + 1}
//                               </div>
//                             </Col>
//                             <Col span={9}>
//                               <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                 Service Description
//                               </Text>
//                               <Input
//                                 value={extra.description}
//                                 onChange={(e) => 
//                                   updateExtraService(serviceIndex, subServiceIndex, extraIndex, 'description', e.target.value)
//                                 }
//                                 placeholder={`Extra service ${extraIndex + 1} description`}
//                                 size="small"
//                               />
//                             </Col>
//                             <Col span={5}>
//                               <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                 Date
//                               </Text>
//                               <DatePicker
//                                 value={extra.date}
//                                 onChange={(date) => 
//                                   updateExtraService(serviceIndex, subServiceIndex, extraIndex, 'date', date)
//                                 }
//                                 placeholder="Date"
//                                 style={{ width: '100%' }}
//                                 size="small"
//                                 format="DD-MM-YYYY"
//                               />
//                             </Col>
//                             <Col span={6}>
//                               <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
//                                 Person Name
//                               </Text>
//                               <Input
//                                 value={extra.person}
//                                 onChange={(e) => 
//                                   updateExtraService(serviceIndex, subServiceIndex, extraIndex, 'person', e.target.value)
//                                 }
//                                 placeholder="Person name"
//                                 size="small"
//                                 prefix={<User size={12} />}
//                               />
//                             </Col>
//                             <Col span={2} style={{ textAlign: 'center' }}>
//                               {extra.description && extra.date && extra.person ? (
//                                 <CheckCircle size={20} color="#52c41a" />
//                               ) : extraIndex >= 3 ? (
//                                 <Button 
//                                   danger 
//                                   size="small" 
//                                   type="text"
//                                   onClick={() => removeExtraService(serviceIndex, subServiceIndex, extraIndex)}
//                                   icon={<Trash2 size={14} />}
//                                 />
//                               ) : (
//                                 <XCircle size={20} color="#d9d9d9" />
//                               )}
//                             </Col>
//                           </Row>
//                         </Card>
//                       ))}
                      
//                       <Button
//                         type="dashed"
//                         size="small"
//                         onClick={() => addExtraService(serviceIndex, subServiceIndex)}
//                         icon={<Plus size={14} />}
//                         style={{ marginTop: 4 }}
//                       >
//                         Add More Extra Service
//                       </Button>
//                     </div>
//                   </Card>
//                 );
//               })}

//               <Button 
//                 type="dashed" 
//                 onClick={() => addSubService(serviceIndex)} 
//                 icon={<Plus size={16} />}
//                 style={{ marginTop: 8 }}
//               >
//                 Add Sub Service
//               </Button>
//             </Card>
//           ))}

//           <Button 
//             type="dashed" 
//             onClick={addMainService} 
//             size="large"
//             icon={<Plus size={18} />}
//           >
//             Add Main Service
//           </Button>
//         </Card>

//         {/* SAVE */}
//         <Row justify="end">
//           <Space>
//             <Button
//               size="large"
//               icon={<RotateCcw size={16} />}
//               onClick={clearForm}
//               style={{ padding: '12px 32px', fontSize: 16 }}
//             >
//               Clear Form
//             </Button>
//             <Button
//               type="primary"
//               size="large"
//               icon={<Save size={18} />}
//               onClick={handleSave}
//               loading={isLoading}
//               disabled={isLoading}
//               style={{ fontWeight: 'bold', padding: '12px 48px', fontSize: 16 }}
//             >
//               {isLoading ? 'Saving...' : 'Save Service Details'}
//             </Button>
//           </Space>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default ServiceForm;


import { useState } from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
  Tag,
  Divider,
  message,
} from 'antd';
import { CheckCircle, XCircle, Calendar, User, Plus, Trash2, Save, RotateCcw } from 'lucide-react';
import { useCreateServiceMutation } from '../redux/features/management/serviceApi';

const { Title, Text } = Typography;

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

/**
 * Type additions only — no logic changes.
 * These types remove the implicit 'any' errors and ensure state shape is explicit.
 */

type ExtraService = {
  description: string;
  date: any | null;
  person: string;
};

type Visit = {
  visitNumber: number;
  date: any | null;
  person: string;
  completed: boolean;
};

type SubService = {
  subServiceName: string;
  frequency: string;
  plannedCount: number;
  visits: Visit[];
  extraServices: ExtraService[];
};

type Service = {
  mainService: string;
  subServices: SubService[];
};

type FormData = {
  clientName: string;
  gstPercentage: number | null;
  billingType: string;
  workAddress: string;
  billingAddress: string;
  serviceStartDate: any | null;
  serviceEndDate: any | null;
  services: Service[];
};

const ServiceForm = () => {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    gstPercentage: null,
    billingType: '',
    workAddress: '',
    billingAddress: '',
    serviceStartDate: null,
    serviceEndDate: null,
    services: [],
  });

  const [createService, { isLoading }] = useCreateServiceMutation();

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addMainService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { mainService: '', subServices: [] }]
    }));
  };

  const removeMainService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const updateMainService = (index: number, value: string) => {
    setFormData(prev => {
      const services = [...prev.services];
      services[index].mainService = value;
      return { ...prev, services };
    });
  };

  const addSubService = (serviceIndex: number) => {
    setFormData(prev => {
      const services = [...prev.services];
      services[serviceIndex].subServices.push({
        subServiceName: '',
        frequency: '',
        plannedCount: 0,
        visits: [],
        extraServices: [
          { description: '', date: null, person: '' },
          { description: '', date: null, person: '' },
          { description: '', date: null, person: '' }
        ]
      });
      return { ...prev, services };
    });
  };

  const removeSubService = (serviceIndex: number, subServiceIndex: number) => {
    setFormData(prev => {
      const services = [...prev.services];
      services[serviceIndex].subServices = services[serviceIndex].subServices.filter(
        (_, i) => i !== subServiceIndex
      );
      return { ...prev, services };
    });
  };

  const updateSubService = (
    serviceIndex: number,
    subServiceIndex: number,
    field: keyof SubService,
    value: any
  ) => {
    setFormData(prev => {
      const services = [...prev.services];
      const target = services[serviceIndex].subServices[subServiceIndex] as any;
      target[field] = value;

      if (field === 'frequency') {
        const freq = frequencyOptions.find(f => f.value === value);
        if (freq) {
          target.plannedCount = freq.count;
          target.visits = Array(freq.count).fill(null).map((_, idx) => ({
            visitNumber: idx + 1,
            date: null,
            person: '',
            completed: false,
          }));
        }
      }

      if (field === 'plannedCount') {
        const count = Number(value) || 0;
        target.visits = Array(count).fill(null).map((_, idx) => ({
          visitNumber: idx + 1,
          date: null,
          person: '',
          completed: false,
        }));
      }

      return { ...prev, services };
    });
  };

  const updateVisit = (
    serviceIndex: number,
    subServiceIndex: number,
    visitIndex: number,
    field: keyof Visit,
    value: any
  ) => {
    setFormData(prev => {
      const services = [...prev.services];
      const visit = services[serviceIndex].subServices[subServiceIndex].visits[visitIndex] as any;
      visit[field] = value;

      if (visit.date && visit.person) {
        visit.completed = true;
      } else {
        visit.completed = false;
      }

      return { ...prev, services };
    });
  };

  const addExtraService = (serviceIndex: number, subServiceIndex: number) => {
    setFormData(prev => {
      const services = [...prev.services];
      services[serviceIndex].subServices[subServiceIndex].extraServices.push({
        description: '',
        date: null,
        person: ''
      });
      return { ...prev, services };
    });
  };

  const removeExtraService = (serviceIndex: number, subServiceIndex: number, extraIndex: number) => {
    setFormData(prev => {
      const services = [...prev.services];
      services[serviceIndex].subServices[subServiceIndex].extraServices =
        services[serviceIndex].subServices[subServiceIndex].extraServices.filter(
          (_, i) => i !== extraIndex
        );
      return { ...prev, services };
    });
  };

  const updateExtraService = (
    serviceIndex: number,
    subServiceIndex: number,
    extraIndex: number,
    field: keyof ExtraService,
    value: any
  ) => {
    setFormData(prev => {
      const services = [...prev.services];
      // keyed access is safe because `field` is keyof ExtraService
      services[serviceIndex].subServices[subServiceIndex].extraServices[extraIndex][field] = value;
      return { ...prev, services };
    });
  };

  const handleSave = async () => {
    console.log('=== SAVE BUTTON CLICKED ===');
    console.log('Current formData:', formData);

    // Validation
    if (!formData.clientName || formData.gstPercentage === null || !formData.billingType ||
        !formData.workAddress || !formData.billingAddress ||
        !formData.serviceStartDate || !formData.serviceEndDate) {
      console.error('Validation failed: Missing client information');
      message.error('Please fill all client information fields');
      return;
    }

    if (formData.services.length === 0) {
      console.error('Validation failed: No services added');
      message.error('Please add at least one service');
      return;
    }

    // Validate services
    for (let service of formData.services) {
      if (!service.mainService) {
        console.error('Validation failed: Missing main service');
        message.error('Please select main service for all services');
        return;
      }
      if (service.subServices.length === 0) {
        console.error('Validation failed: No sub services');
        message.error('Please add at least one sub service');
        return;
      }
      for (let subService of service.subServices) {
        if (!subService.subServiceName || !subService.frequency || !subService.plannedCount) {
          console.error('Validation failed: Incomplete sub service', subService);
          message.error('Please fill all sub service details');
          return;
        }
      }
    }

    console.log('✅ All validations passed');

    // Prepare payload - properly convert dates
    const payload = {
      clientName: formData.clientName,
      gstPercentage: formData.gstPercentage,
      billingType: formData.billingType,
      workAddress: formData.workAddress,
      billingAddress: formData.billingAddress,
      serviceStartDate: formData.serviceStartDate.toISOString(),
      serviceEndDate: formData.serviceEndDate.toISOString(),
      services: formData.services.map(service => ({
        mainService: service.mainService,
        subServices: service.subServices.map(subService => ({
          subServiceName: subService.subServiceName,
          frequency: subService.frequency,
          plannedCount: subService.plannedCount,
          visits: subService.visits.map(visit => ({
            visitNumber: visit.visitNumber,
            date: visit.date ? visit.date.toISOString() : null,
            person: visit.person || '',
            completed: visit.completed || false,
          })),
          extraServices: subService.extraServices
            .filter(extra => extra.description || extra.date || extra.person)
            .map(extra => ({
              description: extra.description || '',
              date: extra.date ? extra.date.toISOString() : null,
              person: extra.person || '',
            })),
        })),
      })),
    };

    console.log('📤 Payload to send:', JSON.stringify(payload, null, 2));

    try {
      console.log('🔄 Calling createService API...');
      const response = await createService(payload).unwrap();
      console.log('✅ Success! Response:', response);
      message.success('Service details saved successfully!');

      // Reset form after successful save
      setFormData({
        clientName: '',
        gstPercentage: null,
        billingType: '',
        workAddress: '',
        billingAddress: '',
        serviceStartDate: null,
        serviceEndDate: null,
        services: [],
      });
    } catch (error) {
      // cast to any to access potential error shape
      const err = error as any;
      console.error('❌ Error saving service:', err);
      console.error('Full error object:', JSON.stringify(err, null, 2));
      message.error(err?.data?.message || err?.message || 'Failed to save service details');
    }
  };

  const clearForm = () => {
    setFormData({
      clientName: '',
      gstPercentage: null,
      billingType: '',
      workAddress: '',
      billingAddress: '',
      serviceStartDate: null,
      serviceEndDate: null,
      services: [],
    });
    message.info('Form cleared');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
      <Card>
        <Title level={3}>Service Management Form</Title>

        {/* CLIENT DETAILS */}
        <Card title="Client Information" style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col span={8}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>Client Name <span style={{ color: 'red' }}>*</span></Text>
                <Input
                  value={formData.clientName}
                  onChange={(e) => updateFormData('clientName', e.target.value)}
                  placeholder="Enter client name"
                  style={{ marginTop: 8 }}
                />
              </div>
            </Col>

            <Col span={8}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>GST (%) <span style={{ color: 'red' }}>*</span></Text>
                <InputNumber
                  value={formData.gstPercentage}
                  onChange={(value) => updateFormData('gstPercentage', value)}
                  min={0}
                  max={28}
                  style={{ width: '100%', marginTop: 8 }}
                  placeholder="Enter GST %"
                />
              </div>
            </Col>

            <Col span={8}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>Billing Type <span style={{ color: 'red' }}>*</span></Text>
                <Select
                  value={formData.billingType}
                  onChange={(value) => updateFormData('billingType', value)}
                  placeholder="Select billing type"
                  style={{ width: '100%', marginTop: 8 }}
                >
                  <Select.Option value="service">Service to Service</Select.Option>
                  <Select.Option value="monthly">Monthly</Select.Option>
                  <Select.Option value="quarterly">Quarterly</Select.Option>
                  <Select.Option value="yearly">Yearly</Select.Option>
                </Select>
              </div>
            </Col>

            <Col span={12}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>Work Address <span style={{ color: 'red' }}>*</span></Text>
                <Input.TextArea
                  value={formData.workAddress}
                  onChange={(e) => updateFormData('workAddress', e.target.value)}
                  rows={2}
                  placeholder="Enter work address"
                  style={{ marginTop: 8 }}
                />
              </div>
            </Col>

            <Col span={12}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>Billing Address <span style={{ color: 'red' }}>*</span></Text>
                <Input.TextArea
                  value={formData.billingAddress}
                  onChange={(e) => updateFormData('billingAddress', e.target.value)}
                  rows={2}
                  placeholder="Enter billing address"
                  style={{ marginTop: 8 }}
                />
              </div>
            </Col>

            <Col span={6}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>AMC Start Date <span style={{ color: 'red' }}>*</span></Text>
                <DatePicker
                  value={formData.serviceStartDate}
                  onChange={(date) => updateFormData('serviceStartDate', date)}
                  style={{ width: '100%', marginTop: 8 }}
                />
              </div>
            </Col>

            <Col span={6}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>AMC End Date <span style={{ color: 'red' }}>*</span></Text>
                <DatePicker
                  value={formData.serviceEndDate}
                  onChange={(date) => updateFormData('serviceEndDate', date)}
                  style={{ width: '100%', marginTop: 8 }}
                />
              </div>
            </Col>
          </Row>
        </Card>

        {/* SERVICES */}
        <Card title="Services Provided" style={{ marginBottom: 16 }}>
          {formData.services.map((service, serviceIndex) => (
            <Card
              key={serviceIndex}
              type="inner"
              style={{ marginBottom: 16, backgroundColor: '#fafafa' }}
            >
              <Space align="start" style={{ display: 'flex', marginBottom: 12 }}>
                <Select
                  value={service.mainService}
                  onChange={(value) => updateMainService(serviceIndex, value)}
                  placeholder="Select Main Service"
                  style={{ width: 240 }}
                >
                  {mainServices.map(ms => (
                    <Select.Option key={ms} value={ms}>{ms}</Select.Option>
                  ))}
                </Select>

                <Button
                  danger
                  onClick={() => removeMainService(serviceIndex)}
                  icon={<Trash2 size={16} />}
                >
                  Remove Main Service
                </Button>
              </Space>

              {/* SUB SERVICES */}
              {service.subServices.map((subService, subServiceIndex) => {
                const completedVisits = subService.visits.filter(v => v.completed).length;
                const totalVisits = subService.plannedCount || 0;

                return (
                  <Card
                    key={subServiceIndex}
                    size="small"
                    style={{ marginBottom: 16, backgroundColor: '#fff', border: '2px solid #1890ff' }}
                  >
                    {/* Sub Service Header */}
                    <Row gutter={8} align="middle" style={{ marginBottom: 16 }}>
                      <Col span={7}>
                        <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                          Sub Service
                        </Text>
                        <Select
                          value={subService.subServiceName}
                          onChange={(value) =>
                            updateSubService(serviceIndex, subServiceIndex, 'subServiceName', value)
                          }
                          placeholder="Select Sub Service"
                          style={{ width: '100%' }}
                        >
                          {subServices.map(ss => (
                            <Select.Option key={ss} value={ss}>{ss}</Select.Option>
                          ))}
                        </Select>
                      </Col>

                      <Col span={6}>
                        <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                          Frequency
                        </Text>
                        <Select
                          value={subService.frequency}
                          onChange={(value) =>
                            updateSubService(serviceIndex, subServiceIndex, 'frequency', value)
                          }
                          placeholder="Select Frequency"
                          style={{ width: '100%' }}
                        >
                          {frequencyOptions.map(freq => (
                            <Select.Option key={freq.value} value={freq.value}>
                              {freq.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Col>

                      <Col span={4}>
                        <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                          Total Visits
                        </Text>
                        <InputNumber
                          value={subService.plannedCount}
                          onChange={(value) =>
                            updateSubService(serviceIndex, subServiceIndex, 'plannedCount', value)
                          }
                          min={1}
                          placeholder="Count"
                          style={{ width: '100%' }}
                        />
                      </Col>

                      <Col span={4}>
                        {totalVisits > 0 && (
                          <div>
                            <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                              Progress
                            </Text>
                            <Tag color={completedVisits === totalVisits ? 'success' : 'processing'} style={{ fontSize: 13 }}>
                              {completedVisits} / {totalVisits} Done
                            </Tag>
                          </div>
                        )}
                      </Col>

                      <Col span={3} style={{ textAlign: 'right' }}>
                        <Button
                          danger
                          size="small"
                          onClick={() => removeSubService(serviceIndex, subServiceIndex)}
                          icon={<Trash2 size={14} />}
                          style={{ marginTop: 18 }}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>

                    <Divider style={{ margin: '12px 0' }} />

                    {/* VISIT TRACKING - ALL VISITS SHOWN */}
                    {totalVisits > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ backgroundColor: '#e6f7ff', padding: '8px 12px', borderRadius: 4, marginBottom: 12 }}>
                          <Calendar size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                          <Text strong style={{ fontSize: 14 }}>Visit Tracking - Mark Each Visit</Text>
                        </div>

                        <Row gutter={[8, 8]}>
                          {subService.visits.map((visit, visitIndex) => (
                            <Col span={12} key={visitIndex}>
                              <Card
                                size="small"
                                style={{
                                  border: visit.completed ? '2px solid #52c41a' : '1px solid #d9d9d9',
                                  backgroundColor: visit.completed ? '#f6ffed' : '#fafafa'
                                }}
                              >
                                <Row gutter={8} align="middle">
                                  <Col span={3}>
                                    <div style={{
                                      width: 36,
                                      height: 36,
                                      borderRadius: '6px',
                                      backgroundColor: visit.completed ? '#52c41a' : '#d9d9d9',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: '#fff',
                                      fontWeight: 'bold',
                                      fontSize: 14
                                    }}>
                                      {visitIndex + 1}
                                    </div>
                                  </Col>

                                  <Col span={10}>
                                    <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
                                      Visit Date
                                    </Text>
                                    <DatePicker
                                      value={visit.date}
                                      onChange={(date) =>
                                        updateVisit(serviceIndex, subServiceIndex, visitIndex, 'date', date)
                                      }
                                      style={{ width: '100%' }}
                                      placeholder="Select date"
                                      size="small"
                                      format="DD-MM-YYYY"
                                    />
                                  </Col>

                                  <Col span={9}>
                                    <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
                                      Person Name
                                    </Text>
                                    <Input
                                      value={visit.person}
                                      onChange={(e) =>
                                        updateVisit(serviceIndex, subServiceIndex, visitIndex, 'person', e.target.value)
                                      }
                                      placeholder="Person name"
                                      prefix={<User size={12} />}
                                      size="small"
                                    />
                                  </Col>

                                  <Col span={2} style={{ textAlign: 'center' }}>
                                    {visit.completed ? (
                                      <CheckCircle size={20} color="#52c41a" />
                                    ) : (
                                      <XCircle size={20} color="#d9d9d9" />
                                    )}
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    )}

                    {/* EXTRA SERVICES - 3 DEFAULT */}
                    <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fffbe6', borderRadius: 6 }}>
                      <div style={{ marginBottom: 12 }}>
                        <Text strong style={{ fontSize: 14 }}>Extra Services (Additional)</Text>
                        <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>
                          - 3 extra service slots available for customer requests
                        </Text>
                      </div>

                      {subService.extraServices.map((extra, extraIndex) => (
                        <Card key={extraIndex} size="small" style={{ marginBottom: 8, backgroundColor: '#fff' }}>
                          <Row gutter={8} align="middle">
                            <Col span={2}>
                              <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: '6px',
                                backgroundColor: (extra.description && extra.date && extra.person) ? '#faad14' : '#d9d9d9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 13
                              }}>
                                E{extraIndex + 1}
                              </div>
                            </Col>
                            <Col span={9}>
                              <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
                                Service Description
                              </Text>
                              <Input
                                value={extra.description}
                                onChange={(e) =>
                                  updateExtraService(serviceIndex, subServiceIndex, extraIndex, 'description', e.target.value)
                                }
                                placeholder={`Extra service ${extraIndex + 1} description`}
                                size="small"
                              />
                            </Col>
                            <Col span={5}>
                              <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
                                Date
                              </Text>
                              <DatePicker
                                value={extra.date}
                                onChange={(date) =>
                                  updateExtraService(serviceIndex, subServiceIndex, extraIndex, 'date', date)
                                }
                                placeholder="Date"
                                style={{ width: '100%' }}
                                size="small"
                                format="DD-MM-YYYY"
                              />
                            </Col>
                            <Col span={6}>
                              <Text strong style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>
                                Person Name
                              </Text>
                              <Input
                                value={extra.person}
                                onChange={(e) =>
                                  updateExtraService(serviceIndex, subServiceIndex, extraIndex, 'person', e.target.value)
                                }
                                placeholder="Person name"
                                size="small"
                                prefix={<User size={12} />}
                              />
                            </Col>
                            <Col span={2} style={{ textAlign: 'center' }}>
                              {extra.description && extra.date && extra.person ? (
                                <CheckCircle size={20} color="#52c41a" />
                              ) : extraIndex >= 3 ? (
                                <Button
                                  danger
                                  size="small"
                                  type="text"
                                  onClick={() => removeExtraService(serviceIndex, subServiceIndex, extraIndex)}
                                  icon={<Trash2 size={14} />}
                                />
                              ) : (
                                <XCircle size={20} color="#d9d9d9" />
                              )}
                            </Col>
                          </Row>
                        </Card>
                      ))}

                      <Button
                        type="dashed"
                        size="small"
                        onClick={() => addExtraService(serviceIndex, subServiceIndex)}
                        icon={<Plus size={14} />}
                        style={{ marginTop: 4 }}
                      >
                        Add More Extra Service
                      </Button>
                    </div>
                  </Card>
                );
              })}

              <Button
                type="dashed"
                onClick={() => addSubService(serviceIndex)}
                icon={<Plus size={16} />}
                style={{ marginTop: 8 }}
              >
                Add Sub Service
              </Button>
            </Card>
          ))}

          <Button
            type="dashed"
            onClick={addMainService}
            size="large"
            icon={<Plus size={18} />}
          >
            Add Main Service
          </Button>
        </Card>

        {/* SAVE */}
        <Row justify="end">
          <Space>
            <Button
              size="large"
              icon={<RotateCcw size={16} />}
              onClick={clearForm}
              style={{ padding: '12px 32px', fontSize: 16 }}
            >
              Clear Form
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<Save size={18} />}
              onClick={handleSave}
              loading={isLoading}
              disabled={isLoading}
              style={{ fontWeight: 'bold', padding: '12px 48px', fontSize: 16 }}
            >
              {isLoading ? 'Saving...' : 'Save Service Details'}
            </Button>
          </Space>
        </Row>
      </Card>
    </div>
  );
};

export default ServiceForm;