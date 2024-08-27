// sendEmail.ts

import sgMail from '@sendgrid/mail';
import { checkIsEmailValid } from '../../utils/utils';

type AttachmentData = {
    content: string;
    filename: string;
    type?: string;
    disposition?: string;
    contentId?: string;
}

type SendGridConstructor = {
    to: string;
    from: string;
    subject: string;
    text?: string;
    html?: string;
    attachments?: AttachmentData[];
}

class SendGrid {
    to: string;
    from: string;
    subject: string;
    text: string | undefined;
    html: string | undefined;
    attachments: AttachmentData[] | undefined;

    constructor(data: SendGridConstructor) {
        const sendgridApiKey = process.env.SENDGRID_API_KEY;

        if (!sendgridApiKey) {
            throw new Error('SENDGRID_API_KEY is not set');
        }
        
        sgMail.setApiKey(sendgridApiKey);
        
        const { to, from, subject, text, html } = data;

        this.to = to;
        this.from = from;
        this.subject = subject;
        this.text = text;
        this.html = html;
        this.attachments = data.attachments;

        this.validateData();
    }

    private validateTo() {
        if (Array.isArray(this.to)) {
            return this.to.every(email => checkIsEmailValid(email));
        }

        return checkIsEmailValid(this.to);
    }

    private validateFrom() {
        if (Array.isArray(this.from)) {
            return this.from.every(email => checkIsEmailValid(email));
        }

        return checkIsEmailValid(this.from);
    }

    private validateSubject() {
        return this.subject.length > 0;
    }


    private validateData() {
        return this.validateTo() && this.validateFrom() && this.validateSubject();
    }

    private constructMessage() {
        return {
            to: this.to,
            from: this.from,
            subject: this.subject,
            text: this.text || ' ',
            html: this.html || ' ',
            attachments: this.attachments
        }
    }

    public async sendEmail() {
        try {
            await sgMail.send(this.constructMessage());
            console.log('Email sent successfully');
        } catch (error: any) {
            console.error('Error sending email:', error);
            if (error.response) {
            console.error(error.response.body);
            }
        }
    }
}

export default SendGrid;

export type {
    SendGridConstructor,
    AttachmentData
};
