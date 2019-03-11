# Annual Credit Card Merchant Meeting 2018

Who needs to undergo PCI training? 
Anyone who operates POS (point of sale) terminals (Cashiers).

Vantiv - First Data
the new POS terminal there is a cost. do we need to switch?

## General Data Protection Regulation (GDPR)
- if you store information about a person that makes them identifiable, 
they have a right to be forgotten (purged from your system). It affects any EU citizens and US citizens living in the EU. So
it will affect international programs. It will also affect us since we track user information - on Flex, mostly.
We need to have a plan in place to purge user information in the case of a request.
Since we use an outside vendor we'd need to request it. This thing is new and evolving, so not much is known about how to be compliant
when using an outside vendor. THINK ABOUT: Round three and erasure. But we are already compliant because we can just go
remove the person from the db entirely if they request it.

## Self assessment questionairre: must answer YES to all the questions.

## new merchants: 
- Contract review, if on the cloud, another set of requirements for vendor data centers
- external qualified security assessor reivew
- substantial changes may need all the same (new hosted to hosted or vice versa)
- substantial rewrite or reprogramming
- change in processor vendor
- any change to your device IPS or other network changes must notify pci@admin.umass.edu

# Annual Credit Card Merchant Meeting 2019

## What is PCI? 
PCI Secutiy Standards Council was created in 2006 by some credit card companies
PCI DSS (Payment Card Industry Data Security Standard) covers security of the environments that sore, process, or transmit account data.
Who does PCI DSS apply to?
- Anyone who accepts credit cards
- Umass merchants must be PCI DSS compliant and are responsible for ensuring their compliance
- The program applies to all payment channels, including: in person (point of sale) mail, telephone order and/or e-commerce.
- Failure to comply with PCI DSS can result un stiff contractual pentalies or sanctions from members of the payment card industry.

## Self-Assessment Questionaires (SAQs)
- required by PCI to verify compliance
- self-attestation as a merchant that you are following the standards

## Which form do I fill out?
- depends on how you accept credit cards
Annual external audit
Annual taraining required
One point of non-compliance puts the entire university system out of compliance

## SAQ version 3.2
- can be found at https://www.umass.edu/afsystems/ecommerce
Vendor documentation to be submitted with your SAQ
- attestation of compliance from Vendor
- attestation of compliance from processor if not cybersource or authorize.net
- send your vendors the following documents
 - nondescrimination/harassment policy and relationship code of conduct
 - return all documentation via email to pci@admin.umass.edu by April 15 

Who needs to be trained? Send an email to pci@admin.umass.edu.
How to get training?
Cashiers
- submit a copy of your training to pci@admin.umass.edu

## Incident response
Potential incidents:
- tampering
- malware
- skimmer
- malware installed on or other unauthorized access to any computer or website usd for card processing/reporting
- social engineering
- email, telephone, letter, website that tricks you into providing information or take an action that can be used to compromise systems or data.
This is why we keep an inspection log.

##  WHAT DO YOU DO?
- contact: itprotect@umass.edu and pci@admin.umass.edu

## New merchants?
- Contact patty roper early in the process
- initial vendor information request to help you get all the required documentation
- required contract language
- qualified security assessor review required by state of MA
- it procurement policy - www.umass.edu/it/procurement
substantial changes - 
upgrade, changing processor, moving servers, moving to hosted from on premise or vice versa.
Any change to your device IPs or other network changes must notify pci@adminumass.edu
