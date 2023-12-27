/**
 * Dummy invoices list
 * @type {Invoice[]}
 */
export const invoices = [
  {
    id: '1',
    invoiceNumber: 'INV-2023001',
    createdAt: 1679817600000, // Timestamp for January 25, 2023 (in milliseconds)
    price: 150.99,
    pdfUrl: '#',
    userId: '2',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2023002',
    createdAt: 1679904000000, // Timestamp for January 26, 2023 (in milliseconds)
    price: 99.95,
    pdfUrl: '#',
    userId: '2',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2023003',
    createdAt: 1679990400000, // Timestamp for January 27, 2023 (in milliseconds)
    price: 249.75,
    pdfUrl: '#',
    userId: '2',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2023004',
    createdAt: 1680076800000, // Timestamp for January 28, 2023 (in milliseconds)
    price: 199.5,
    pdfUrl: '#',
    userId: '2',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2023005',
    createdAt: 1680163200000, // Timestamp for January 29, 2023 (in milliseconds)
    price: 349.25,
    pdfUrl: '#',
    userId: '2',
  },
  {
    id: '6',
    invoiceNumber: 'INV-2023006',
    createdAt: 1680249600000, // Timestamp for January 30, 2023 (in milliseconds)
    price: 79.99,
    pdfUrl: '#',
    userId: '2',
  },
  {
    id: '7',
    invoiceNumber: 'INV-2023007',
    createdAt: 1680336000000, // Timestamp for January 31, 2023 (in milliseconds)
    price: 129.75,
    pdfUrl: '#',
    userId: '2',
  },
  {
    id: '8',
    invoiceNumber: 'INV-2023008',
    createdAt: 1680422400000, // Timestamp for February 1, 2023 (in milliseconds)
    price: 299.5,
    pdfUrl: '#',
    userId: '2',
  },
  {
    id: '9',
    invoiceNumber: 'INV-2023009',
    createdAt: 1680508800000, // Timestamp for February 2, 2023 (in milliseconds)
    price: 179.25,
    pdfUrl: '#',
    userId: '2',
  },
  {
    id: '10',
    invoiceNumber: 'INV-2023010',
    createdAt: 1680595200000, // Timestamp for February 3, 2023 (in milliseconds)
    price: 219.99,
    pdfUrl: '#',
    userId: '2',
  },
];

/**
 * Find invoices by user id
 * @param {string} id
 * @returns {Invoice[]}
 */
export const getInvoicesByUserId = (id) => invoices.filter((invoice) => invoice.userId === id);

/**
 * Find invoice by id
 * @param {string} id
 * @returns {Invoice | undefined}
 */
export const getInvoiceById = (id) => invoices.find((invoice) => invoice.id === id);
