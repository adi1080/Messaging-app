-- 1) Create database
CREATE DATABASE IF NOT EXISTS messaging_app
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE messaging_app;

-- 2) Insert Agent Login Details
INSERT INTO agents (agent_name, password) VALUES
('Harsh', '12345'),
('AgentTwo', '12345'),
('Arjun', '12345');

-- 3) Create table
CREATE TABLE customer_messages (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message_body TEXT NOT NULL,
    responded_by VARCHAR(255),
    responded_at DATETIME,
    reply TEXT,
    urgency INT NOT NULL,
    timestamp_utc DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4) Insert data from CSV
INSERT INTO customer_messages (user_id, timestamp_utc, message_body, urgency) VALUES
(208, '2017-02-01 19:29:05', 'So it means if u pay ua loan before the due date is a disadvantage the last time I paid earlier it was still a problem', 3),
(208, '2017-02-01 19:21:58', 'The dates of payment are still indicated n no money sent', 1),
(208, '2017-02-01 19:21:18', 'Why was my application rejected', 1),
(208, '2017-02-01 19:05:45', 'Hi branch I requested my number to remain the one I was using there before 0720225243  I don''t understand how it changed', 1),
(218, '2017-02-01 16:08:21', 'I said ill pay 5th esther camoon.. Infact you guys took a week to give me a loan and just cant wait 4days for me to pay back??', 3),
(218, '2017-02-01 14:07:37', 'I  will pay on sunday of 5th and i will pay all the amount.. If that is allowed??', 1),
(218, '2017-02-01 12:07:07', 'I have a late source of salary i expected but i will pay nexr', 1),
(444, '2017-02-02 15:57:36', 'I will clear my loan before 15nth,kindly bear with me.January was tough.', 3),
(676, '2017-02-03 14:23:45', 'Hi can i get the batch number', 1),
(676, '2017-02-03 14:23:25', 'Hi can i get the batch number pl', 1),
(779, '2017-02-03 18:59:40', 'I Still not satisfied. I am still asking for a review.  My number is 0723506931 or at least give me a clear reason.  Thanks', 1),
(779, '2017-02-02 17:33:52', 'My number is 0723506931. please have a review of my loan. I haven''t defaulted and I have cleared my outstanding loan on the due date.', 3),
(779, '2017-02-02 17:29:24', 'Hi branch I have just cleared my  loan which was due today but unfortunately you have denied me. I haven''t applied for a loan since December but your system says that I have applied for a loan last week. Please review my loan', 3),
(1092, '2017-02-03 18:53:47', 'I got only this number please help me', 1),
(1092, '2017-02-01 19:02:59', 'My number is 0790898526 help me to validate it please so i can be able to access the loan', 3),
(1155, '2017-02-03 07:01:34', 'Hello,our salaries have been delayed but hopefully will be paid today or tomorrow.', 1),
(1241, '2017-02-01 12:43:51', 'Thanks Branch for being understanding ..have cleared my loan....God bless you', 3),
(1245, '2017-02-03 16:28:35', 'Hi, kindly can i have the batch number', 1),
(1245, '2017-02-02 16:47:18', 'I have to clear by tomorrow please send me the batch number', 1),
(1245, '2017-02-02 16:19:26', 'I was at CRB offices and they haven''t received your clearance batch number. Please send it to me so I can clear with them.', 1),
(1354, '2017-02-03 05:17:48', 'No need just expunge my details from the system', 1),
(1354, '2017-02-02 21:33:40', 'Thank you for the loans i have benefitted from "the branch". Kindly expunge my details from your system. Its frustrating to be told to re apply in 7 days week in week out....it makes me look like a criminal. I will not be applying again.', 3),
(1354, '2017-02-02 12:02:10', 'My loan has been rejected because it was rejected recently, after 14days suspension am being suspended again for a further 7days', 3),
(1481, '2017-02-03 01:52:01', 'Hello. Why can''t you make the loan payment options more... like say a choice between weekly and monthly.. someone to choose when applying for the loans..  regards', 3),
(2035, '2017-02-03 09:06:39', 'Ok', 1),
(2035, '2017-02-02 18:25:13', 'Hi,sorry for the short text however Someone used my I.D and did register a line and took mshwari loan but venye nili realize nilipigia safaricom customer care and i did the payment  and cleared a bill of 299now i dont have  any what is the way forward.', 3),
(2035, '2017-02-02 17:55:39', 'Someone used', 1),
(2035, '2017-02-02 05:59:11', 'What am i supposed to do after paying in order to re', 1),
(2126, '2017-02-01 16:06:23', 'Any response to my above queries please???', 1),
(2126, '2017-02-01 15:58:00', 'Kindly advise what sms are not in my phone....', 1),
(2126, '2017-02-01 15:52:19', 'And have no current loan... Im upto date ...', 3),
(2126, '2017-02-01 15:51:32', 'If there is a way u can check the mpesa sms in my phone.. Check and see all transactions sms are available ....and mpesa account is very active', 1),
(2126, '2017-02-01 15:50:24', 'All my Mpesa sms are stored in sim card for long period ...and none has been deleted...', 1),
(2126, '2017-02-01 15:47:10', 'What SMSs should i accumulate on my phone?', 1),
(2126, '2017-02-01 15:37:22', 'Why has my loan application been rejected and i have never defaulted on any repayments and l always pay on time?', 3),
(2126, '2017-02-01 15:33:06', 'Why has loan been rejected?', 3),
(2517, '2017-02-02 03:20:38', 'Ok thanks', 1),
(2517, '2017-02-01 18:06:50', 'I forwarded my certificate of clearance from trans union and even you replied that my account was cleared and you gave me a loan  of kshs 250 which I cleared. What is happening to my account?', 3),
(2780, '2017-02-01 00:05:55', 'I cant access your services', 1),
(2788, '2017-02-02 13:20:16', 'ok', 1),
(2788, '2017-02-02 12:54:13', 'I promise to finish my loan by this month', 3),
(2884, '2017-02-01 07:57:12', 'The messages are on my line...', 1),
(2884, '2017-02-01 07:56:47', 'I hv my transaction messages with me y am i not approved to this time? I urgently need the cash', 3);
