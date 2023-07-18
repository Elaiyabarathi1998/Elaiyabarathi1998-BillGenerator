import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import './invoice.css';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Invoice = () => {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const sNo = searchParams.get('sNo');
  const treatment = searchParams.get('treatment');
  const description = searchParams.get('description');
  const quantity = searchParams.get('quantity');
  const rate = searchParams.get('rate');
  const amount = searchParams.get('amount');
  const billTo = searchParams.get('billTo');
  const registerNo = searchParams.get('registerNo');
  const date = searchParams.get('date');

  const handleGoBack = () => {
    navigate('/');
  };

  const generatePDF = (billTo, registerNo, date) => {
    const filename = `${billTo}_invoice.pdf`;
    const docDefinition = {
      content: [
        {
          columns: [
            {
              stack: [
                {
                  svg:
                    '<svg><text x="0" y="15" font-size="24" fill="#FF3131">logo</text></svg>',
                  width: 100,
                },
              ],
            },
            {
              stack: [
                {
                  text: '123 Hospital Street, City, Country',
                  margin: [0, 0, 0, 10],
                  alignment: 'right',
                },
              ],
            },
          ],
        },
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 3, lineColor: '#FF3131' }] },
        {
          text: 'Invoice',
          fontSize: 24,
          bold: true,
          margin: [0, 0, 0, 10],
          color: '#FF3131',
          alignment: 'center',
        },
        {
          columns: [
            {
              text: `Bill To: ${billTo}`,
              margin: [0, 0, 10, 0],
              style: {
                fontSize: 16,
                alignment: 'justify',
              },
            },
            {
              text: `Date: ${date}`,
              margin: [0, 0, 0, 10],
              style: {
                fontSize: 16,
                alignment: 'right',
              },
            },
          ],
          margin: [0, 0, 0, 10],
        },
        {
          text: `Register No.: ${registerNo}`,
          margin: [0, 0, 0, 10],
          style: {
            fontSize: 16,
            alignment: 'center',
          },
        },
        {
          style: 'table',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'S.No', bold: true },
                { text: 'Treatment', bold: true },
                { text: 'Description', bold: true },
                { text: 'Quantity', bold: true },
                { text: 'Rate', bold: true },
                { text: 'Amount', bold: true },
              ],
              
              [sNo, treatment, description, quantity, rate, amount],
            ],
          },
          margin: [0, 10, 0, 10],
        },
        {
          columns: [
            {
              stack: [
                {
                  text: 'Gross Total  :  ',
                  bold: true,
                  alignment: 'right',
                  fontSize: 16,
                },
                {
                  text: 'Discount  :  ',
                  bold: true,
                  alignment: 'right',
                  fontSize: 16,
                },
                {
                  text: 'Total Receivable  :  ',
                  bold: true,
                  alignment: 'right',
                  fontSize: 16,
                },
                {
                  text: 'Paid  :  ',
                  bold: true,
                  alignment: 'right',
                  fontSize: 16,
                },
                {
                  text: 'Balance Due for Payment  :  ',
                  
                  alignment: 'right',
                  bold: true,
            color: '#FF3131',
            fontSize: 20,
                },
              ],
              
              alignment: 'right',
              margin: [0, 0, 0, 10],
            },
            {
              stack: [
                {
                  text: [
                    { text: `  $${amount}\n`, fontSize: 16, alignment: 'right' },
                    { text: '  $0\n', fontSize: 16, alignment: 'right' },
                    { text: `  $${amount}\n`, fontSize: 16, alignment: 'right' },
                    { text: `  $${amount}\n`, fontSize: 16, alignment: 'right' },
                    { text: '  $0\n', fontSize: 16,bold: true,
                    color: '#FF3131', alignment: 'right' },
                  ],
                },
              ],
              width: 'auto',
              alignment: 'right',
            },
          ],
          margin: [0, 10, 0, 10],
          
          
        },
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 3, lineColor: '#FF3131' }] },
,
        
        {
          text: 'Payment Method: Cash',
          margin: [0, 10, 0, 10],
          style: {
            fontSize: 24,
            bold: true,
            color: '#FF3131',
            alignment: 'justify',
          },
         
        },
        {
          text: 'Authorized Signatory',
          margin: [0, 10, 0, 10],
          style: {
            fontSize: 16,
            alignment: 'justify',
          },
        },
        {
          text: 'Hospital Name',
          margin: [0, 0, 0, 10],
          style: {
            fontSize: 16,
            alignment: 'justify',
          },
        },
        {
          text: 'Thank you for choosing us',
          fontSize: 20,
          bold: true,
          margin: [0, 40, 0, 0],
          alignment: 'center',
        },
        {
          text: 'Terms and Conditions:',
          bold: true,
          margin: [0, 40, 0, 0],
          style: {
            fontSize: 24,
            alignment: 'justify',
          },
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          margin: [0, 5, 0, 0],
          style: {
            fontSize: 16,
            alignment: 'justify',
          },
        },
        {
          text: 'Mauris vitae quam id odio volutpat convallis.',
          margin: [0, 5, 0, 0],
          style: {
            fontSize: 16,
            alignment: 'justify',
          },
        },
        {
          text:
            'Aenean varius, metus sed molestie consequat, elit odio gravida lacus, vitae gravida ipsum nulla in est.',
          margin: [0, 5, 0, 0],
          style: {
            fontSize: 16,
            alignment: 'justify',
          },
        },
      ],
      styles: {
        table: {
          margin: [0, 10, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(filename);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">logo</div>
        <div className="address">
          <p>123 Hospital Street, City, Country</p>
        </div>
        <div className="line"></div>
      </div>

      <div className="gap"></div>

      <div className="invoice">Invoice</div>

      <div className="bill-details">
        <div>Bill To: {billTo}</div>
        <div>Register No.: {registerNo}</div>
        <div>Date: {date}</div>
      </div>

      <div className="gap"></div>

      <div className="content-header">
        <div>S.No</div>
        <div>Treatment</div>
        <div>Description</div>
        <div>Quantity</div>
        <div>Rate</div>
        <div className="rate-amount-section">
          <div>Amount</div>
        </div>
      </div>

      <div className="content-row">
        <div>{sNo}</div>
        <div>{treatment}</div>
        <div>{description}</div>
        <div>{quantity}</div>
        <div>{rate}</div>
        <div>{amount}</div>
      </div>

      <div className="calculation-section">
        <div>
          <div style={{ textAlign: 'right' }}>Gross Total:</div>
          <div style={{ textAlign: 'right' }}>Discount:</div>
          <div style={{ textAlign: 'right' }}>Total Receivable:</div>
          <div style={{ textAlign: 'right' }}>Paid:</div>
          <div className="balance-due" style={{ textAlign: 'right' }}>
            Balance Due for Payment:
          </div>
        </div>
        <div className="rate-amount-section">
          <div>{amount}</div>
          <div>0</div>
          <div>{amount}</div>
          <div>{amount}</div>
          <div className="balance-due">0</div>
        </div>
      </div>

      <div className="total-line"></div>

      <div className="payment-method">Payment Method: Cash</div>

      <div className="additional-content">Authorized Signatory</div>
      <div className="additional-content">Hospital Name</div>

      <div className="thank-you">Thank you for choosing us</div>

      <div className="footer">
        <strong className="footer-strong">Terms and Conditions:</strong>
        <br />
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        <br />
        <span>Mauris vitae quam id odio volutpat convallis.</span>
        <br />
        <span>
          Aenean varius, metus sed molestie consequat, elit odio gravida lacus,
          vitae gravida ipsum nulla in est.
        </span>
      </div>

      <div className="button-container">
        <button className="btn btn-primary" onClick={handleGoBack}>
          Go Back
        </button>

        <button
          className="btn btn-primary"
          onClick={() => generatePDF(billTo, registerNo, date)}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
