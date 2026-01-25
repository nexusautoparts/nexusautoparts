import nodemailer from 'nodemailer';

// Configure transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface LeadData {
    name: string;
    email: string;
    phone: string;
    year?: string;
    make?: string;
    model?: string;
    part?: string;
    vin?: string;
    message?: string;
}

export async function sendLeadEmails(lead: LeadData) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("SMTP credentials missing. Skipping email sending.");
        return;
    }

    // 1. Send Notification to Sales
    const salesMailOptions = {
        from: `"Nexus System" <${process.env.SMTP_USER}>`,
        to: 'sales@nexusautopartsus.com',
        subject: `New Lead: ${lead.year} ${lead.make} ${lead.model} - ${lead.part}`,
        html: `
            <h2>New Lead Received</h2>
            <p><strong>Customer:</strong> ${lead.name}</p>
            <p><strong>Email:</strong> ${lead.email}</p>
            <p><strong>Phone:</strong> ${lead.phone}</p>
            <hr />
            <h3>Vehicle Details</h3>
            <p><strong>Year:</strong> ${lead.year || 'N/A'}</p>
            <p><strong>Make:</strong> ${lead.make || 'N/A'}</p>
            <p><strong>Model:</strong> ${lead.model || 'N/A'}</p>
            <p><strong>Part:</strong> ${lead.part || 'N/A'}</p>
            <p><strong>VIN:</strong> ${lead.vin || 'N/A'}</p>
            <p><strong>Message:</strong> ${lead.message || 'N/A'}</p>
        `
    };

    // 2. Send Confirmation to Customer
    const customerMailOptions = {
        from: `"Nexus Auto Parts" <admin@nexusautopartsus.com>`, // As requested: admin@nexusemail (using domain for consistency)
        to: lead.email,
        subject: 'We Received Your Parts Request!',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Thank you for your request, ${lead.name.split(' ')[0]}!</h2>
                <p>We have received your inquiry for a <strong>${lead.year || ''} ${lead.make || ''} ${lead.model || ''} - ${lead.part || 'part'}</strong>.</p>
                <p>A dedicated parts specialist is reviewing our inventory and will be reaching out to you by phone within the next <strong>5–10 minutes</strong> with a quote.</p>
                <p>Please make sure you are available to take the call at <strong>${lead.phone}</strong>.</p>
                <br />
                <p>If you need immediate assistance, please call us at:</p>
                <h3 style="color: #d32f2f;">866-317-1665</h3>
                <br />
                <p>Best Regards,<br/>Nexus Auto Parts Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(salesMailOptions);
        console.log('Sales notification sent');
        await transporter.sendMail(customerMailOptions);
        console.log('Customer confirmation sent');
    } catch (error) {
        console.error('Error sending emails:', error);
    }
}
