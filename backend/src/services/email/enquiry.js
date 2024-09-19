/* eslint-disable n/no-deprecated-api */
import nodemailer from 'nodemailer'
import { generatepdf } from './invoicedesign.js'
import moment from 'moment-timezone'

export const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW
    }
  })
}

export const sendOrderEmail = async (orderData) => {
  const transporter = createTransporter()
  const pdfBuffer = await generatepdf(orderData.Order_id);
  //console.log(pdfBuffer)
  const mailOptions = {
    from: {
      name: 'Sunpro Mart',
      address:process.env.NODEMAILER_EMAIL
    },
    to: orderData.Email,
    cc: process.env.NODEMAILER_EMAIL,
    subject: 'Sunpro Mart',
    html: `
        <p>Your Order ID : ${orderData.Order_id} has been Successfully submitted</p>
        <p>Order Date: ${moment(orderData.Order_Date).tz('Asia/Kolkata').format('DD-MM-YYYY')}</p>
        <p>Total Amount: ${orderData.Total_Amount}</p>
        <p>Order Status: ${orderData.Order_Status}</p>
        <p>Thank you again for your purchase! We look forward to serving you again soon.</p>
        <p>Best regards,</p>
        <img src="${process.env.URL}/images/logo.png"  width="150" style="margin-bottom: 3px"><br>
      `,
    attachments: [{
      filename: `${orderData.Order_id}.pdf`,
      content: pdfBuffer
    }]
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const sendenquiryMail = (data, files) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    let mailOptions = {
      from: data.Email,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Sunpro Mart',
      attachments: [
        {
          filename: files[0].originalname,
          content: files[0].buffer
        }
      ],
      html: `
      <ul>
        <li>Name: ${data.Name}</li>
        <li>Email: ${data.Email}</li>
        <li>Mobile Number: ${data.Mobilenumber}</li>
        <li>Address: ${data.Address}</li>
        <li>Country: ${data.Country}</li>
        <li>State: ${data.State}</li>
        <li>City: ${data.City}</li>
        <li>Zipcode: ${data.Zipcode}</li>
        <li>Message: ${data.Message}</li>
      </ul>
    `
    }
    if (files.length > 0) {
      mailOptions = {
        ...mailOptions,
        ...{
          attachments: [
            {
              filename: files[0].originalname,
              content: files[0].buffer
            }
          ]
        }
      }
    }
    const replymailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: data.Email,
      subject: 'Sunpro Mart',
      html: `
      <p>Dear ${data.Name},</p>
      <p>Thank you for your enquiry.</p>

     
    `
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        console.log('Email Sent')
        resolve({ status: 'Email Sent' })
      }
    })
    transporter.sendMail(replymailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        console.log('Email Sent')
        resolve({ status: 'Email Sent' })
      }
    })
  })
}
export default sendenquiryMail
