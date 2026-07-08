export interface CourseModuleData {
  title: string
  content: string
  sortOrder: number
}

export interface CourseData {
  title: string
  description: string
  category: string
  duration: number
  modules: CourseModuleData[]
}

export const defaultCourses: CourseData[] = [
  // -----------------------------------------------------------------------
  // Course 1: GDPR Awareness for Employees
  // -----------------------------------------------------------------------
  {
    title: 'GDPR Awareness for Employees',
    description:
      'Understand your obligations under the General Data Protection Regulation (GDPR) and learn how to handle personal data responsibly in your day-to-day work.',
    category: 'compliance',
    duration: 15,
    modules: [
      {
        title: 'What is GDPR?',
        sortOrder: 0,
        content: `The General Data Protection Regulation (GDPR) is a legal framework that came into effect on 25 May 2018. It sets out rules for how organisations collect, store, use, and share personal data belonging to individuals in the UK and European Economic Area.

GDPR exists because personal data is valuable, and people deserve to know how their information is being used. Before GDPR, data protection laws were fragmented and inconsistent. The regulation created a single, clear standard that all organisations must follow.

**Why does it matter to you?**

Every employee who handles personal data is responsible for doing so correctly. Breaches do not only come from hackers or cyberattacks. Many of the most common data breaches are caused by simple human error, such as sending an email to the wrong person, leaving paperwork on a desk, or sharing login credentials.

Under GDPR, your organisation can face fines of up to 4% of annual global turnover or 17.5 million GBP (whichever is greater) for serious violations. But beyond fines, a breach can damage trust with customers, partners, and colleagues.

**Key principles of GDPR:**

- **Lawfulness, fairness, and transparency:** Data must be processed legally and openly.
- **Purpose limitation:** Data should only be used for the specific reason it was collected.
- **Data minimisation:** Only collect what you genuinely need.
- **Accuracy:** Keep data up to date and correct errors promptly.
- **Storage limitation:** Do not keep data longer than necessary.
- **Integrity and confidentiality:** Protect data against unauthorised access, loss, or damage.
- **Accountability:** Your organisation must be able to demonstrate compliance.

**Key takeaway:** GDPR is not just an IT or legal concern. Every employee plays a role in protecting personal data. Understanding the basics is your first step towards compliance.`,
      },
      {
        title: 'Personal Data Types',
        sortOrder: 1,
        content: `Personal data is any information that can identify a living individual, either on its own or when combined with other information. Understanding what counts as personal data helps you recognise when you need to be careful.

**Examples of personal data:**

- Full name, home address, email address, phone number
- Date of birth, National Insurance number
- Employee ID, payroll number
- IP addresses and cookie data
- Photos and CCTV footage where someone is identifiable
- Bank details and salary information

**Special category data (sensitive data):**

Some types of personal data are considered more sensitive and require extra protection. These include:

- Racial or ethnic origin
- Political opinions
- Religious or philosophical beliefs
- Trade union membership
- Genetic and biometric data (fingerprints, facial recognition)
- Health data (medical records, sickness absence reasons)
- Sexual orientation

In the workplace, you might encounter special category data more often than you think. For example, recording why someone is off sick, noting dietary requirements for an event (which could reveal religious beliefs), or storing next-of-kin details that reveal family relationships.

**Pseudonymised vs anonymised data:**

- **Pseudonymised data** has had identifying details replaced (e.g., using an employee number instead of a name) but can still be linked back to an individual. This is still personal data under GDPR.
- **Anonymised data** has been processed so that the individual cannot be identified at all. Truly anonymised data falls outside the scope of GDPR.

**Key takeaway:** If information can be used to identify someone, directly or indirectly, treat it as personal data and handle it with care. When in doubt, apply the same protections you would want for your own information.`,
      },
      {
        title: 'Your Rights at Work',
        sortOrder: 2,
        content: `As an employee, you have data protection rights that your employer must respect. Understanding these rights empowers you to ask the right questions and take control of your personal information.

**Your key rights under GDPR:**

1. **Right to be informed:** Your employer must tell you what personal data they hold about you, why they hold it, and how long they will keep it. This is typically covered in a privacy notice or employee handbook.

2. **Right of access (Subject Access Request):** You can request a copy of all personal data your employer holds about you. They must respond within one calendar month. This includes HR records, performance reviews, emails about you, and any other data linked to you.

3. **Right to rectification:** If your personal data is inaccurate or incomplete, you can ask for it to be corrected. For example, if your address is wrong in the HR system, your employer must update it when you ask.

4. **Right to erasure ("right to be forgotten"):** In some circumstances, you can ask for your data to be deleted. However, this right is not absolute. Your employer may need to keep certain records for legal or regulatory reasons (such as tax records or pension data).

5. **Right to restrict processing:** You can ask your employer to limit how they use your data while a dispute is being resolved.

6. **Right to data portability:** You can request your data in a commonly used, machine-readable format so you can transfer it elsewhere.

7. **Right to object:** You can object to your data being used for certain purposes, such as direct marketing.

**How to exercise your rights:**

If you want to make a request, speak to your HR team or your organisation's Data Protection Officer (DPO) if one has been appointed. Put your request in writing (email is fine) and be as specific as possible about what you need.

**Key takeaway:** You have real, enforceable rights over your personal data at work. Do not hesitate to ask questions or make requests. A good employer will welcome your engagement with data protection.`,
      },
      {
        title: 'Data Breaches: What to Do',
        sortOrder: 3,
        content: `A data breach occurs when personal data is accidentally or unlawfully accessed, disclosed, altered, lost, or destroyed. Breaches are more common than you might think, and knowing how to respond quickly can significantly reduce the damage.

**Common examples of data breaches in the workplace:**

- Sending an email containing personal data to the wrong recipient
- Losing an unencrypted USB drive or laptop
- Leaving confidential documents on a printer or in a meeting room
- Accidentally sharing a spreadsheet with visible personal data
- Discussing someone's personal details in a public space where others can overhear
- Failing to redact personal information in a shared document
- A colleague accessing records they are not authorised to view

**What should you do if you spot a breach?**

1. **Do not panic.** Mistakes happen, and the most important thing is to act quickly.
2. **Stop the breach if you can.** For example, recall the email, retrieve the document, or revoke access.
3. **Report it immediately.** Tell your line manager, HR team, or Data Protection Officer straight away. Most organisations have a data breach reporting process.
4. **Document what happened.** Note down the date, time, what data was involved, how it happened, and who was affected. This information is critical for the organisation's response.
5. **Do not try to cover it up.** Hiding a breach makes things significantly worse. Under GDPR, your organisation may need to report the breach to the Information Commissioner's Office (ICO) within 72 hours, and to affected individuals if the risk is high.

**Why speed matters:**

The ICO expects organisations to report serious breaches within 72 hours of becoming aware of them. If you delay reporting internally, the organisation may miss this deadline and face additional penalties.

**Key takeaway:** Report any suspected data breach immediately, no matter how small it seems. Early reporting gives your organisation the best chance of containing the damage and meeting its legal obligations.`,
      },
      {
        title: 'Keeping Data Safe Daily',
        sortOrder: 4,
        content: `Data protection is not something you do once and forget about. It needs to be part of your everyday working habits. Here are practical steps you can take right now to protect personal data in your daily routine.

**At your desk:**

- Lock your computer every time you leave your desk, even for a moment. Use the shortcut: Windows key + L (Windows) or Control + Command + Q (Mac).
- Do not write passwords on sticky notes or leave them visible near your screen.
- Position your screen so that visitors or passers-by cannot see sensitive information.
- Use a privacy screen filter if you work in an open-plan environment or shared space.

**Using email and messaging:**

- Double-check the recipient before sending any email containing personal data.
- Use the "bcc" field when emailing multiple external recipients to avoid sharing their email addresses with each other.
- Avoid sending unencrypted sensitive data via email. If you must share sensitive files, use password-protected attachments or a secure file-sharing platform.
- Be cautious with "reply all." Ask yourself whether every recipient needs to see your response.

**Working with documents:**

- Collect documents from the printer promptly. Never leave them sitting in the tray.
- Shred or securely dispose of paper documents containing personal data. Do not put them in general waste.
- Save digital files to authorised, secure locations (such as company drives) rather than personal devices.
- Review documents before sharing to ensure they do not contain hidden personal data (check other tabs in spreadsheets, metadata in documents, or tracked changes).

**Working remotely:**

- Ensure your home Wi-Fi is secured with a strong password and up-to-date firmware.
- Do not use public Wi-Fi for work unless you are connected through a VPN.
- Keep physical documents locked away when not in use. Do not leave them visible to other household members.
- Be mindful of video calls. Check what is visible on your screen before sharing it.

**Key takeaway:** Good data protection is about building habits. Small, consistent actions every day, like locking your screen, checking email recipients, and securing documents, make a real difference in keeping personal data safe.`,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Course 2: Workplace Health & Safety Basics
  // -----------------------------------------------------------------------
  {
    title: 'Workplace Health & Safety Basics',
    description:
      'Learn the fundamentals of health and safety at work, including your legal responsibilities, how to identify hazards, and what to do in an emergency.',
    category: 'compliance',
    duration: 12,
    modules: [
      {
        title: 'Your Responsibilities',
        sortOrder: 0,
        content: `Health and safety at work is a shared responsibility. Both employers and employees have legal duties under the Health and Safety at Work etc. Act 1974 and related regulations.

**Your employer must:**

- Provide a safe working environment, including safe equipment and systems of work
- Carry out risk assessments and act on the findings
- Provide adequate training and information about health and safety
- Ensure welfare facilities (toilets, drinking water, rest areas) are available
- Consult with employees on health and safety matters
- Display the Health and Safety Law poster (or distribute the equivalent leaflet)

**As an employee, you must:**

- Take reasonable care of your own health and safety and that of others who may be affected by your actions
- Cooperate with your employer on health and safety matters
- Not interfere with or misuse anything provided for health and safety (fire extinguishers, safety guards, first aid kits)
- Report any hazards, defects, or dangerous situations to your manager or health and safety representative
- Follow the training and instructions you have been given
- Use personal protective equipment (PPE) correctly when provided

**What "reasonable care" means in practice:**

Taking reasonable care does not mean you need to be a health and safety expert. It means being sensible and thinking about the consequences of your actions. For example, if you spill liquid on the floor, clean it up or put up a warning sign. If you notice a frayed cable, report it rather than ignoring it.

**Can you be held personally liable?**

Yes. While employers carry the primary duty, employees who deliberately disregard safety rules or act recklessly can face prosecution under health and safety law. In serious cases, this can lead to fines or even imprisonment.

**Key takeaway:** Health and safety is everyone's job. You do not need to be an expert, but you do need to be aware, follow instructions, and speak up when something is not right.`,
      },
      {
        title: 'Risk Assessments',
        sortOrder: 1,
        content: `A risk assessment is a careful examination of what could cause harm in the workplace, so that you can judge whether enough precautions have been taken or whether more should be done.

**The five steps of risk assessment:**

1. **Identify the hazards.** Walk around the workplace and look for anything that could cause harm. This includes physical hazards (trip hazards, heavy objects, electrical equipment), chemical hazards (cleaning products, solvents), biological hazards (mould, bacteria), and ergonomic hazards (poor desk setup, repetitive movements).

2. **Decide who might be harmed and how.** Think about all the people who could be affected: employees, visitors, contractors, cleaners, delivery drivers. Consider vulnerable groups such as new starters, pregnant workers, young workers, and people with disabilities.

3. **Evaluate the risks and decide on precautions.** For each hazard, assess how likely it is that someone could be harmed and how serious the harm could be. Then decide what steps are needed to reduce the risk to an acceptable level. Look at what you are already doing, and ask whether it is enough.

4. **Record your findings and implement them.** If your organisation has five or more employees, you must record the significant findings of the risk assessment in writing. But regardless of size, you should write them down as good practice. Make sure the actions are actually carried out.

5. **Review and update regularly.** Risk assessments are not a one-off exercise. Review them whenever something changes (new equipment, new processes, an incident) and at regular intervals.

**Your role in risk assessments:**

Even if you are not responsible for carrying out formal risk assessments, you play a vital part. You know your day-to-day work environment better than anyone. If you spot a new hazard or think a risk is not being managed properly, tell your manager. Your observations can prevent accidents.

**Key takeaway:** Risk assessments are the foundation of good health and safety management. They work best when everyone contributes their knowledge about the real hazards in their work environment.`,
      },
      {
        title: 'Reporting Hazards',
        sortOrder: 2,
        content: `Reporting hazards is one of the most important things you can do to keep your workplace safe. Many serious accidents could have been prevented if someone had reported a hazard before it caused harm.

**What counts as a hazard?**

A hazard is anything with the potential to cause harm. This could be:

- A wet or slippery floor
- A damaged or frayed electrical cable
- Poor lighting in a stairwell
- Blocked fire exits or obstructed escape routes
- Defective equipment or machinery
- Unsecured shelving or items stored at height
- Missing or damaged safety signs
- A colleague working in a way that could cause injury

**How to report a hazard:**

1. **If the hazard is immediately dangerous,** take action to warn others if you can do so safely. For example, put up a warning sign near a spill, or move people away from a structural hazard.

2. **Tell your line manager or supervisor straight away.** A verbal report is fine for urgent issues, but follow up in writing so there is a record.

3. **Use your organisation's reporting system.** Many workplaces have hazard report forms, online reporting tools, or a dedicated health and safety inbox. Find out what system your organisation uses.

4. **Be specific.** Describe the hazard clearly: where it is, what the risk is, and when you noticed it. The more detail you provide, the easier it is for someone to take action.

**What happens after you report?**

Your employer should investigate the hazard, assess the risk, and take appropriate action. This might be an immediate fix (repairing a broken step) or a longer-term solution (redesigning a work process). You should receive feedback on what was done.

**You are protected by law:**

Under the Employment Rights Act 1996, you cannot be dismissed or disciplined for raising genuine health and safety concerns. If you believe you have been penalised for reporting a hazard, you may have grounds for a claim.

**Key takeaway:** Never assume someone else will report a hazard. If you see something, say something. Prompt reporting saves lives and prevents injuries.`,
      },
      {
        title: 'Fire Safety',
        sortOrder: 3,
        content: `Fire safety is a critical part of workplace safety. Understanding how to prevent fires, what to do when the alarm sounds, and where to go can make the difference between a calm evacuation and a dangerous situation.

**Fire prevention in the workplace:**

- Keep your work area tidy. Clutter, especially paper, cardboard, and textiles, provides fuel for fire.
- Do not overload electrical sockets or use damaged extension leads.
- Turn off electrical equipment when not in use, unless it is designed to run continuously.
- Store flammable materials (chemicals, aerosols, cleaning products) in designated areas away from heat sources.
- Never prop open fire doors. They are designed to slow the spread of fire and smoke.
- Report any faults with fire safety equipment (smoke detectors, fire extinguishers, emergency lighting).

**When the fire alarm sounds:**

1. **Stop what you are doing immediately.** Do not finish your task, save your work, or collect personal belongings.
2. **Leave the building by the nearest safe exit.** Follow the green fire exit signs. Do not use lifts.
3. **Close doors behind you** as you leave. This helps contain the fire.
4. **Go to the designated assembly point.** Do not wait near the building entrance or go to your car.
5. **Report to the fire warden or marshal** at the assembly point so they can account for everyone.
6. **Do not re-enter the building** until the fire service or a responsible person gives the all-clear.

**Know your building:**

- Identify at least two escape routes from your usual work area.
- Know where the nearest fire alarm call point is.
- Know where the fire extinguishers are, but only use one if you have been trained and it is safe to do so.
- Know the location of the assembly point.

**Fire drills:**

Take fire drills seriously. They are a chance to practise your evacuation and identify any problems (blocked routes, slow response, confusion about assembly points). Note the time it takes and whether everyone knew what to do.

**Key takeaway:** Fire safety is about preparation and habits. Know your escape routes, keep fire doors closed, do not block exits, and always treat the alarm as real until told otherwise.`,
      },
      {
        title: 'Display Screen Equipment',
        sortOrder: 4,
        content: `If you use a computer, laptop, or tablet for a significant part of your working day, the Health and Safety (Display Screen Equipment) Regulations 1992 apply to you. These regulations are designed to prevent musculoskeletal problems, eye strain, and fatigue.

**Setting up your workstation correctly:**

- **Chair:** Adjust your chair so your feet are flat on the floor (or on a footrest) and your thighs are roughly horizontal. Your lower back should be supported by the chair's backrest.
- **Screen:** Position your screen directly in front of you, about an arm's length away. The top of the screen should be at or just below eye level. Tilt the screen slightly to avoid glare.
- **Keyboard and mouse:** Keep your keyboard and mouse close to you, at the same height. Your wrists should be straight, not bent upwards. Consider using a wrist rest if it helps.
- **Desk:** You should have enough space to change position and move freely. Keep frequently used items within easy reach to avoid stretching or twisting.

**Preventing eye strain:**

- Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet (about 6 metres) away for 20 seconds.
- Adjust your screen brightness to match your surroundings. A screen that is much brighter or darker than the ambient light causes more strain.
- Increase text size if you find yourself leaning forward to read.
- Clean your screen regularly. Dust and smudges reduce clarity and increase strain.
- If you wear glasses, make sure your prescription is current. Your employer must pay for an eye test if you are a habitual display screen user, and for corrective lenses if they are needed specifically for screen work.

**Taking breaks:**

- Regular short breaks from screen work are more beneficial than occasional long breaks. Aim to take a 5 to 10 minute break from your screen every hour.
- Use break time to stand, stretch, and move around. This reduces the risk of musculoskeletal problems.
- Vary your tasks. If possible, alternate between screen-based work and other activities.

**Working from home:**

The same principles apply when working from home. If your home setup is not adequate, speak to your employer about what equipment or support they can provide.

**Key takeaway:** A properly set up workstation and regular breaks are essential for anyone who works at a screen. Small adjustments can prevent long-term problems with your back, neck, shoulders, and eyes.`,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Course 3: Equality, Diversity & Inclusion
  // -----------------------------------------------------------------------
  {
    title: 'Equality, Diversity & Inclusion',
    description:
      'Explore the principles of equality, diversity, and inclusion in the workplace. Learn about protected characteristics, unconscious bias, and how to build a truly inclusive environment.',
    category: 'compliance',
    duration: 15,
    modules: [
      {
        title: 'Protected Characteristics',
        sortOrder: 0,
        content: `The Equality Act 2010 protects people from discrimination in the workplace based on nine protected characteristics. Understanding these characteristics is the foundation of equality law in the UK.

**The nine protected characteristics:**

1. **Age:** Applies to all ages. It is unlawful to discriminate against someone because they are younger or older.
2. **Disability:** A physical or mental impairment that has a substantial and long-term adverse effect on the ability to carry out normal day-to-day activities.
3. **Gender reassignment:** Protection for anyone proposing to undergo, undergoing, or having undergone a process to reassign their sex.
4. **Marriage and civil partnership:** Protection from discrimination for people who are married or in a civil partnership. (This characteristic only applies to workplace discrimination, not services.)
5. **Pregnancy and maternity:** Protection from discrimination for pregnant women and new mothers, including during maternity leave.
6. **Race:** Includes colour, nationality, ethnic origin, and national origin.
7. **Religion or belief:** Includes any religion, religious belief, or philosophical belief, as well as a lack of religion or belief.
8. **Sex:** Protection from discrimination based on being male or female.
9. **Sexual orientation:** Protection for people who are heterosexual, gay, lesbian, or bisexual.

**Types of discrimination:**

- **Direct discrimination:** Treating someone less favourably because of a protected characteristic.
- **Indirect discrimination:** Applying a policy, practice, or rule that applies to everyone but disadvantages people with a particular protected characteristic.
- **Harassment:** Unwanted conduct related to a protected characteristic that violates someone's dignity or creates an intimidating, hostile, degrading, humiliating, or offensive environment.
- **Victimisation:** Treating someone badly because they have made or supported a complaint about discrimination.

**Key takeaway:** Everyone is protected by the Equality Act. Understanding the nine protected characteristics helps you recognise when behaviour or decisions might cross the line into discrimination, even if that is not the intention.`,
      },
      {
        title: 'Unconscious Bias',
        sortOrder: 1,
        content: `Unconscious bias refers to the automatic judgements and assumptions we make about people based on characteristics such as their appearance, accent, name, background, or social group. These biases develop over a lifetime through our experiences, upbringing, culture, and media exposure.

**Why unconscious bias matters at work:**

Unconscious bias can influence decisions about hiring, promotions, task allocation, performance reviews, and everyday interactions. Because these biases operate below our conscious awareness, we often do not realise they are affecting our judgement.

**Common types of unconscious bias:**

- **Affinity bias:** Favouring people who are similar to us in background, interests, or appearance.
- **Confirmation bias:** Seeking out information that confirms our existing beliefs about someone while ignoring contradictory evidence.
- **Halo effect:** Allowing one positive trait (such as attending a prestigious university) to influence our overall impression of a person.
- **Horn effect:** Allowing one negative trait to colour our entire view of someone.
- **Attribution bias:** Attributing a person's success to luck or external factors while attributing their failures to personal shortcomings (or the reverse, depending on the group they belong to).

**What can you do about it?**

- **Acknowledge it.** Everyone has unconscious biases. Recognising this is not a weakness; it is a starting point for improvement.
- **Slow down decisions.** When making judgements about people, pause and consider whether your reasoning is based on evidence or assumption.
- **Seek different perspectives.** Actively involve colleagues with different backgrounds and viewpoints in decisions, especially in recruitment and promotions.
- **Challenge your assumptions.** When you catch yourself making a snap judgement about someone, ask yourself where that assumption comes from and whether it is supported by facts.
- **Use structured processes.** In hiring and performance reviews, use consistent criteria applied to everyone rather than relying on gut feelings.

**Key takeaway:** Unconscious bias is natural, but it becomes a problem when it goes unchecked. By becoming aware of your biases and actively working to counteract them, you help create a fairer workplace for everyone.`,
      },
      {
        title: 'Inclusive Language',
        sortOrder: 2,
        content: `The language we use at work has a powerful impact on whether people feel welcome, respected, and valued. Inclusive language is about choosing words that do not exclude, demean, or make assumptions about others.

**General principles:**

- **Use person-first language when appropriate.** For example, "a person with a disability" rather than "a disabled person" (though note that some people prefer identity-first language, so follow individual preferences when known).
- **Avoid gendered defaults.** Use "they/them" as a singular pronoun when you do not know someone's gender. Use "chair" or "chairperson" instead of "chairman." Use "firefighter" instead of "fireman."
- **Respect names and pronouns.** Use the name and pronouns that a person asks you to use. If you are unsure, it is okay to ask politely. If you make a mistake, correct yourself and move on without making a big deal of it.
- **Avoid stereotypes and generalisations.** Do not make assumptions about someone's abilities, interests, or life circumstances based on their background, age, gender, or appearance.

**Phrases to reconsider:**

- Instead of "guys" (when addressing a mixed group), try "everyone," "team," or "folks."
- Instead of "manpower," try "workforce" or "staffing."
- Instead of "maiden name," try "previous name" or "birth name."
- Instead of "normal" (when contrasting with disability or neurodivergence), try "typical" or simply describe what you mean.
- Avoid idioms or cultural references that may not translate across backgrounds. What is obvious to you may be confusing or alienating to someone else.

**When you get it wrong:**

Nobody gets it right every time. If someone tells you that your language was hurtful or exclusionary, listen without becoming defensive. Thank them for telling you, apologise sincerely, and adjust your language going forward. The goal is not perfection; it is willingness to learn.

**Key takeaway:** Inclusive language is not about policing speech. It is about being thoughtful and respectful, and making sure that no one feels excluded or diminished by the words used around them.`,
      },
      {
        title: 'Reporting Discrimination',
        sortOrder: 3,
        content: `If you experience or witness discrimination, harassment, or bullying in the workplace, it is important to know that you have options and that you are protected by law when you raise concerns.

**Recognising discrimination:**

Discrimination is not always obvious. It can include:

- Being passed over for a promotion or training opportunity because of a protected characteristic
- Receiving less favourable terms of employment compared to colleagues in a similar role
- Being subjected to jokes, comments, or "banter" related to your race, gender, sexuality, religion, age, or disability
- Being excluded from meetings, social events, or decision-making processes
- Having your concerns dismissed or minimised because of who you are

**Steps to take:**

1. **Keep a record.** Write down dates, times, what was said or done, and who was present. Save any relevant emails, messages, or documents. A written record strengthens your position if you need to raise a formal complaint.

2. **Talk to the person directly (if safe to do so).** Sometimes people are unaware that their behaviour is discriminatory. A calm, direct conversation can resolve the situation. However, you are not obligated to do this, especially if the behaviour is serious or you feel unsafe.

3. **Report to your line manager or HR.** If speaking directly to the person is not possible or appropriate, raise the matter with your manager or HR team. Be specific about what happened and provide your written record.

4. **Use the formal grievance procedure.** If informal approaches do not resolve the issue, you have the right to raise a formal grievance. Your employer should have a written grievance procedure, and they must investigate your complaint and respond within a reasonable timeframe.

5. **Seek external support.** If you are not satisfied with your employer's response, you can contact ACAS (Advisory, Conciliation and Arbitration Service) for advice. You can also bring a claim to an employment tribunal, but you must usually contact ACAS for early conciliation first.

**Protection from victimisation:**

Under the Equality Act 2010, it is unlawful for your employer to treat you badly because you have made a complaint about discrimination, or because you have supported a colleague's complaint.

**Key takeaway:** You have the right to work in an environment free from discrimination. If something is not right, speak up. The law protects you when you do.`,
      },
      {
        title: 'Building an Inclusive Workplace',
        sortOrder: 4,
        content: `An inclusive workplace is one where every person feels valued, respected, and able to contribute fully, regardless of their background, identity, or circumstances. Inclusion goes beyond compliance with the law. It is about creating a culture where diversity is genuinely welcomed.

**Why inclusion matters:**

Research consistently shows that inclusive organisations perform better. Diverse teams make better decisions, are more innovative, and are better at solving problems. People who feel included are more engaged, more productive, and more likely to stay with their employer.

**What you can do every day:**

- **Listen actively.** When a colleague speaks, give them your full attention. Do not interrupt or talk over people, and be aware of who tends to dominate conversations and who gets overlooked.
- **Invite different voices.** In meetings and discussions, make space for quieter colleagues to contribute. Ask for their opinion. Be mindful that not everyone communicates in the same way; some people think out loud, while others prefer to reflect before speaking.
- **Celebrate differences.** Acknowledge and respect cultural and religious observances. Learn about your colleagues' backgrounds and experiences with genuine curiosity, not as a tick-box exercise.
- **Challenge inappropriate behaviour.** If you hear a discriminatory joke, a dismissive comment, or an exclusionary remark, speak up. You do not have to be aggressive; a simple "That's not okay" or "I don't think that's fair" can make a significant difference.
- **Be an ally.** Supporting colleagues from underrepresented groups is not just the job of HR or management. Being an ally means using your voice and influence to advocate for fairness and inclusion.

**Inclusive practices for managers:**

- Ensure job adverts and descriptions use inclusive language and do not contain unnecessary requirements that could exclude certain groups.
- Use structured interviews with consistent questions for all candidates.
- Offer flexible working arrangements where possible to accommodate different needs.
- Provide training and development opportunities equitably.
- Monitor team dynamics and address any patterns of exclusion early.

**Key takeaway:** Inclusion is built through everyday actions, not grand gestures. Each of us has the power to make our workplace more welcoming and fair. Start with small, deliberate steps and lead by example.`,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Course 4: Mental Health Awareness
  // -----------------------------------------------------------------------
  {
    title: 'Mental Health Awareness',
    description:
      'Develop the awareness and confidence to recognise mental health challenges, support colleagues, and take care of your own wellbeing at work.',
    category: 'wellbeing',
    duration: 10,
    modules: [
      {
        title: 'Recognising the Signs',
        sortOrder: 0,
        content: `Mental health exists on a spectrum, and everyone experiences ups and downs. However, when someone is struggling, there are often changes in their behaviour, mood, or performance that you might notice, especially if you know them well.

**Common signs that someone may be struggling:**

- Withdrawal from colleagues, social activities, or conversations they would normally take part in
- Changes in attendance: arriving late, leaving early, increased sickness absence, or working excessively long hours
- Difficulty concentrating, making decisions, or completing tasks that were previously straightforward
- Changes in mood: increased irritability, tearfulness, anxiety, or appearing flat and disengaged
- Changes in appearance or personal hygiene
- Loss of confidence or increased self-doubt
- Physical symptoms: frequent headaches, fatigue, changes in appetite or weight
- Increased reliance on alcohol, caffeine, or other substances

**What you might notice at work:**

- Missed deadlines or a decline in the quality of work
- Overreaction to minor issues or conflicts
- Avoidance of meetings or team activities
- Comments about feeling overwhelmed, hopeless, or not coping
- Uncharacteristic mistakes or forgetfulness

**Important context:**

These signs do not necessarily mean someone has a mental health condition. They could be dealing with a difficult life event, physical illness, or a temporary period of stress. The key is to be observant, not to diagnose.

One in four people will experience a mental health problem in any given year. Depression, anxiety, and stress are the most common issues. They are not signs of weakness, and they can affect anyone regardless of their role, seniority, or background.

**Key takeaway:** You do not need to be a mental health professional to notice when a colleague is not themselves. Being aware of the signs is the first step towards offering support. Trust your instincts: if something feels off, it probably is.`,
      },
      {
        title: 'Supporting Colleagues',
        sortOrder: 1,
        content: `When you notice a colleague struggling, knowing how to offer support can make a real difference. You do not need specialist training to be a good listener and a compassionate colleague.

**How to support someone:**

- **Create a safe space.** Find a quiet, private moment to check in. Avoid having the conversation in front of others. A simple "I've noticed you seem a bit quiet lately. Is everything okay?" can open the door.
- **Listen without judgement.** Let them talk at their own pace. Resist the urge to offer solutions, minimise their feelings, or share your own experiences unless they ask. Sometimes people just need to be heard.
- **Avoid cliches.** Phrases like "cheer up," "just think positive," or "others have it worse" are well-meaning but unhelpful. They can make someone feel that their feelings are not valid.
- **Ask open-ended questions.** "How are you feeling about things?" is better than "Are you okay?" which invites a quick "I'm fine" response.
- **Respect their boundaries.** If someone does not want to talk, do not push. Let them know you are there if they change their mind. Sometimes just knowing support is available makes a difference.
- **Follow up.** Check in again in a few days. Showing continued interest demonstrates that your concern is genuine and not just a one-off.

**Practical support you can offer:**

- Help them prioritise their workload if they are feeling overwhelmed
- Offer to attend a meeting with them if they are anxious about it
- Suggest they speak to their GP, HR, or an Employee Assistance Programme (if your organisation has one)
- Cover a task or shift for them if they need time out
- Simply be present and available

**What not to do:**

- Do not gossip about a colleague's mental health with others
- Do not diagnose them or tell them what is wrong
- Do not pressure them to disclose more than they are comfortable sharing
- Do not promise confidentiality that you cannot keep (for example, if there is a safeguarding concern)

**Key takeaway:** You do not need to have all the answers. Simply showing that you care, listening without judgement, and being a reliable presence can make an enormous difference to someone who is struggling.`,
      },
      {
        title: 'Having the Conversation',
        sortOrder: 2,
        content: `Starting a conversation about mental health can feel uncomfortable, but it is one of the most valuable things you can do. Most people who are struggling say that being asked how they are feeling, with genuine concern, made a positive difference.

**Before the conversation:**

- Choose the right time and place. A quiet, private setting where you will not be interrupted is ideal. Avoid raising it just before a meeting or at the end of the day when they might feel rushed.
- Prepare yourself mentally. You may hear things that are upsetting. That is okay. Your role is to listen, not to fix everything.
- Think about what you want to say. You do not need a script, but having a few opening lines in mind can help you feel more confident.

**Starting the conversation:**

- Be direct but gentle. "I've noticed you've seemed a bit down recently, and I wanted to check if you're okay."
- Use "I" statements rather than "you" statements. "I've been a bit worried about you" feels less confrontational than "You seem really stressed."
- Normalise the conversation. "I know work can be tough sometimes" or "It's okay to not be okay" can help reduce any shame or embarrassment they might feel.

**During the conversation:**

- Let them lead. If they want to talk, let them. If they do not, respect that.
- Maintain eye contact and open body language. Put your phone away and give them your full attention.
- Reflect back what you hear. "It sounds like you're feeling really overwhelmed" shows you are listening.
- Ask what would help. "Is there anything I can do?" or "Would it help to talk to HR about adjusting your workload?"
- Avoid comparing their experience to yours or others'. Each person's experience is unique.

**After the conversation:**

- Thank them for trusting you. It takes courage to open up.
- Follow through on anything you offered. If you said you would look up the EAP number, do it.
- Check in again. A brief "How are you getting on?" a few days later shows ongoing support.

**Key takeaway:** You do not need to be perfect. The fact that you care enough to start the conversation is what matters most. Be genuine, be kind, and be present.`,
      },
      {
        title: 'Available Resources',
        sortOrder: 3,
        content: `Knowing where to turn for help is essential, both for yourself and for anyone you are supporting. Here is a summary of the key resources available.

**Workplace resources:**

- **Your line manager or HR team:** They can help with workplace adjustments, reduced hours, or changes to your duties while you recover. They are bound by confidentiality, though there are limits if there is a risk to safety.
- **Employee Assistance Programme (EAP):** Many organisations provide a free, confidential counselling service through an EAP. This typically includes phone support, face-to-face sessions, and online resources. Check with HR whether your company offers this.
- **Occupational Health:** If your organisation has an occupational health service, they can provide professional assessments and recommend workplace adjustments.
- **Mental Health First Aiders:** Some workplaces train staff as Mental Health First Aiders. They are not therapists, but they can provide initial support and guide you to appropriate resources.

**External resources (UK-based):**

- **Samaritans:** Free, confidential support 24/7. Call 116 123 or email jo@samaritans.org.
- **Mind:** Information and advice on mental health. Call 0300 123 3393 (Mon to Fri, 9am to 6pm) or visit mind.org.uk.
- **NHS 111:** For non-emergency medical advice, including mental health. Call 111 or visit 111.nhs.uk.
- **Crisis text line:** Text SHOUT to 85258 for free, 24/7 text support.
- **CALM (Campaign Against Living Miserably):** For men who are struggling. Call 0800 58 58 58 (daily, 5pm to midnight) or visit thecalmzone.net.
- **Your GP:** Your doctor can refer you for talking therapies, prescribe medication if appropriate, and provide a sick note if you need time off.

**Self-referral for NHS talking therapies:**

In England, you can refer yourself directly for NHS talking therapies (previously called IAPT) without needing a GP referral. Visit nhs.uk/talk and search for your local service.

**Reasonable adjustments:**

If you have a mental health condition that qualifies as a disability under the Equality Act 2010, your employer has a legal duty to make reasonable adjustments. These might include flexible working hours, a phased return after absence, a quieter workspace, or regular check-ins with your manager.

**Key takeaway:** You are not alone, and you do not have to cope in silence. Whether you need support for yourself or for someone you are concerned about, there are people and services ready to help. Reaching out is a sign of strength, not weakness.`,
      },
      {
        title: 'Looking After Yourself',
        sortOrder: 4,
        content: `Taking care of your own mental health is just as important as supporting others. You cannot pour from an empty cup. Building good habits and recognising your own warning signs helps you stay well and perform at your best.

**Foundations of good mental health at work:**

- **Set boundaries.** Separate work from personal time as much as possible. Avoid checking emails outside working hours unless it is genuinely urgent. Learn to say no when your plate is full.
- **Take your breaks.** Skipping lunch or working through breaks might feel productive in the short term, but it reduces your effectiveness and increases your risk of burnout. Step away from your desk. Go outside if you can.
- **Stay connected.** Social isolation is a major risk factor for poor mental health. Make time for casual conversations with colleagues, even if you work remotely. Human connection matters.
- **Move your body.** Regular physical activity is one of the most effective things you can do for your mental health. It does not have to be intense. A 20-minute walk, stretching, or taking the stairs all count.
- **Sleep matters.** Poor sleep and poor mental health are closely linked. Aim for a consistent sleep schedule, limit screen time before bed, and create a restful environment.

**Recognising your own warning signs:**

Everyone experiences stress differently. Learn to recognise your personal signals. For some people, it is disrupted sleep. For others, it is irritability, loss of appetite, difficulty concentrating, or withdrawing from friends and family.

When you notice these signs, do not ignore them. Take them seriously, just as you would a physical symptom. Talk to someone, adjust your workload if possible, and use the resources available to you.

**Building resilience:**

Resilience is not about being tough or suppressing your emotions. It is about having the skills and support systems to cope with challenges and recover from setbacks. Key components include:

- Having trusted people you can talk to
- Maintaining a sense of purpose and meaning in your work
- Practising self-compassion rather than self-criticism
- Accepting that difficult periods are a normal part of life
- Knowing when to ask for help and being willing to do so

**Key takeaway:** Looking after your mental health is not self-indulgent; it is essential. Build healthy habits, know your limits, and treat yourself with the same compassion you would show a colleague. If you are struggling, reach out early rather than waiting until things become overwhelming.`,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Course 5: Data Security Essentials
  // -----------------------------------------------------------------------
  {
    title: 'Data Security Essentials',
    description:
      'Learn practical steps to protect company data and your own digital security, from passwords and phishing to device security and remote working.',
    category: 'compliance',
    duration: 10,
    modules: [
      {
        title: 'Password Security',
        sortOrder: 0,
        content: `Passwords are the first line of defence for your accounts and the data they protect. Weak or reused passwords are one of the most common causes of security breaches.

**What makes a strong password?**

- Use at least 12 characters. Longer passwords are significantly harder to crack.
- Combine uppercase and lowercase letters, numbers, and symbols.
- Avoid common words, phrases, or patterns (e.g., "Password123", "qwerty", or your name and date of birth).
- Do not use the same password for multiple accounts. If one account is compromised, attackers will try the same password on your other accounts.

**The passphrase approach:**

One of the most effective methods is to use a passphrase: a string of random, unrelated words. For example, "Bicycle!Marmalade7Penguin" is both strong and memorable. It is much harder to crack than a short, complex password like "P@55w0rd".

**Use a password manager:**

A password manager generates, stores, and auto-fills strong, unique passwords for every account. You only need to remember one master password. Most organisations provide or recommend a specific password manager. Use it.

**Multi-factor authentication (MFA):**

Wherever possible, enable multi-factor authentication. MFA requires a second form of verification in addition to your password, such as a code from an authenticator app or a fingerprint scan. Even if someone steals your password, they cannot access your account without the second factor.

**What to do if your password is compromised:**

- Change it immediately on the affected account and on any other accounts where you used the same password.
- Report it to your IT team so they can check for unauthorised access.
- Monitor your accounts for unusual activity.

**Key takeaway:** Use long, unique passwords for every account, enable multi-factor authentication wherever it is available, and use a password manager to keep track of them all. These three steps dramatically reduce your risk.`,
      },
      {
        title: 'Phishing Awareness',
        sortOrder: 1,
        content: `Phishing is a type of cyberattack where criminals try to trick you into revealing sensitive information, clicking on malicious links, or downloading harmful attachments. It is the most common method attackers use to gain access to organisations.

**How phishing works:**

Attackers send messages (usually emails, but also text messages, phone calls, or social media messages) that appear to come from a trusted source. The message creates a sense of urgency, curiosity, or fear to pressure you into acting without thinking.

**Common phishing tactics:**

- An email that looks like it comes from your bank, asking you to "verify your account" by clicking a link
- A message from what appears to be your IT department, asking you to reset your password via a link
- An email from a "senior manager" asking you to urgently purchase gift cards or transfer money
- A message containing an invoice or delivery notification with a malicious attachment
- A LinkedIn message from a recruiter with a link to a fake job posting

**How to spot a phishing attempt:**

- **Check the sender's email address carefully.** Hover over the name to see the actual address. Look for subtle misspellings (e.g., support@amaz0n.com instead of support@amazon.com).
- **Look for urgency or threats.** "Your account will be closed in 24 hours" or "Immediate action required" are red flags.
- **Examine links before clicking.** Hover over links to see where they actually lead. If the URL looks suspicious or does not match the supposed sender, do not click.
- **Be suspicious of unexpected attachments.** Even from known contacts, unexpected attachments could indicate their account has been compromised.
- **Check for poor grammar and formatting.** While phishing attempts are becoming more sophisticated, many still contain errors that a legitimate organisation would not make.
- **Verify through another channel.** If an email from your boss asks you to do something unusual, call or message them directly to confirm.

**What to do if you receive a suspicious message:**

1. Do not click any links or download any attachments.
2. Do not reply to the message.
3. Report it to your IT team using the designated method (many organisations have a "Report Phishing" button in their email client).
4. If you have already clicked a link or entered credentials, report it immediately and change your password.

**Key takeaway:** Think before you click. Phishing relies on you acting quickly and without thinking. If something feels off, trust your instincts and verify before taking action.`,
      },
      {
        title: 'Device Security',
        sortOrder: 2,
        content: `Every device you use for work, whether it is a company laptop, your personal phone, or a tablet, is a potential entry point for attackers. Keeping your devices secure is a fundamental part of protecting company data.

**Keep your software up to date:**

Software updates are not just about new features. They frequently contain patches for security vulnerabilities that attackers actively exploit. Enable automatic updates on all your devices, including your operating system, web browser, and applications. Do not postpone updates; install them as soon as possible.

**Lock your devices:**

- Set a PIN, password, fingerprint, or face recognition on all your devices. A device with no lock screen is an open invitation to anyone who picks it up.
- Set your device to lock automatically after a short period of inactivity (ideally one to two minutes).
- Lock your computer manually whenever you step away from it.

**Encrypt your data:**

Encryption scrambles your data so that it cannot be read without the correct key. Most modern operating systems have built-in encryption:

- **Windows:** BitLocker (available on Pro and Enterprise editions)
- **Mac:** FileVault
- **Smartphones:** Most modern phones encrypt data by default when a passcode is set

If you use a USB drive or external hard drive for work files, ensure it is encrypted.

**Be careful with removable media:**

- Never plug an unknown USB drive into your computer. Attackers sometimes leave infected USB drives in public places.
- Only use approved, encrypted USB drives for transferring work data.
- Scan removable media for malware before opening files.

**Physical security:**

- Never leave your laptop, phone, or tablet unattended in public places (cafes, trains, airports).
- When travelling, keep devices in your hand luggage, not checked baggage.
- Use a cable lock for your laptop in shared office spaces if available.
- Report lost or stolen devices to your IT team immediately so they can remotely wipe or lock the device.

**Key takeaway:** Treat every device as a gateway to your organisation's data. Keep it updated, locked, encrypted, and physically secure. If a device is lost or stolen, report it immediately.`,
      },
      {
        title: 'Working from Home Safely',
        sortOrder: 3,
        content: `Remote and hybrid working have become standard for many organisations. While working from home offers flexibility, it also introduces security risks that are not present in a controlled office environment.

**Secure your home network:**

- Change the default password on your Wi-Fi router. Default passwords are publicly known and easily exploited.
- Use WPA3 or WPA2 encryption for your Wi-Fi network (not WEP, which is outdated and insecure).
- Keep your router firmware updated. Manufacturers release updates to fix security vulnerabilities.
- Consider creating a separate Wi-Fi network for your work devices, away from smart home devices and family use.

**Using a VPN:**

A Virtual Private Network (VPN) encrypts your internet connection and routes it through a secure server, protecting your data from interception. If your organisation provides a VPN, use it whenever you are working. This is especially important when accessing internal systems, handling sensitive data, or connecting to any network outside your home.

**Avoid public Wi-Fi for work:**

Public Wi-Fi networks in cafes, hotels, and airports are not secure. Attackers can intercept traffic on these networks with relatively simple tools. If you must work from a public location, always connect through your VPN first and avoid accessing highly sensitive systems.

**Secure your physical workspace:**

- Position your screen so it is not visible through windows or to other household members who should not see work content.
- Lock your computer when you step away, even at home.
- Store any physical documents in a locked drawer or cabinet.
- Shred sensitive documents rather than putting them in household recycling.
- Be mindful during video calls about what is visible on your screen and in your background.

**Separate work and personal:**

- Where possible, use separate devices for work and personal use.
- If you use a personal device for work, ensure it meets your organisation's security requirements (encryption, antivirus, up-to-date software).
- Do not save work files to personal cloud storage (personal Google Drive, Dropbox, etc.) unless your organisation explicitly approves it.
- Clear your browser history and log out of work accounts when you finish for the day on a shared device.

**Key takeaway:** Working from home requires you to take ownership of security that would normally be handled by your IT team in the office. Secure your network, use a VPN, protect your physical workspace, and keep work and personal activities separate.`,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Course 6: Anti-Harassment & Bullying
  // -----------------------------------------------------------------------
  {
    title: 'Anti-Harassment & Bullying',
    description:
      'Understand what harassment and bullying look like in the workplace, know your rights, and learn how to take action if you or a colleague is affected.',
    category: 'compliance',
    duration: 12,
    modules: [
      {
        title: 'What Counts as Harassment',
        sortOrder: 0,
        content: `Harassment is unwanted behaviour that violates a person's dignity or creates an intimidating, hostile, degrading, humiliating, or offensive environment. Under the Equality Act 2010, harassment is specifically linked to protected characteristics (age, disability, gender reassignment, race, religion or belief, sex, and sexual orientation).

**Key points about harassment:**

- **Intent does not matter.** A person can be guilty of harassment even if they did not intend to cause offence. What matters is the effect on the recipient, not the intention of the perpetrator.
- **It does not have to be directed at you.** You can be harassed by behaviour directed at someone else if it creates an offensive environment for you. For example, overhearing racist jokes between colleagues can constitute harassment.
- **A single incident can be enough.** While harassment often involves a pattern of behaviour, a single serious incident can meet the legal definition.
- **"Banter" is not an excuse.** Calling something banter or a joke does not prevent it from being harassment. If the behaviour is unwanted and has the effect described above, it is harassment regardless of how it is labelled.

**Examples of harassment in the workplace:**

- Sexual comments, jokes, or innuendo
- Unwanted physical contact (touching, hugging, blocking someone's path)
- Displaying offensive images or materials, including on screens
- Mimicking someone's accent, disability, or mannerisms
- Spreading rumours about someone's personal life or sexuality
- Making derogatory comments about someone's religion, cultural practices, or appearance
- Sending offensive messages via email, chat, or social media
- Repeatedly singling someone out for criticism in front of others

**Third-party harassment:**

Your employer also has a responsibility to protect you from harassment by third parties, such as clients, customers, or suppliers. If a client makes repeated inappropriate comments to you, your employer should take steps to address it.

**Key takeaway:** Harassment is defined by its impact, not its intent. If behaviour makes you or a colleague feel uncomfortable, degraded, or intimidated, it may be harassment, and it should be addressed.`,
      },
      {
        title: 'Types of Bullying',
        sortOrder: 1,
        content: `Bullying is repeated behaviour that is intended to hurt, intimidate, or humiliate someone. Unlike harassment, bullying is not specifically defined in UK law, but it is taken seriously by employers and can form the basis of a constructive dismissal claim if left unchecked.

**Verbal bullying:**

- Shouting, swearing, or using aggressive language
- Persistent criticism that goes beyond constructive feedback
- Sarcasm, put-downs, or demeaning remarks
- Spreading malicious rumours or gossip
- Publicly humiliating someone in meetings or in front of colleagues

**Physical bullying:**

- Pushing, shoving, or other unwanted physical contact
- Blocking someone's path or invading their personal space
- Throwing objects or slamming doors to intimidate
- Damaging someone's belongings

**Social or relational bullying:**

- Deliberately excluding someone from meetings, conversations, or social events
- Ignoring someone or giving them the silent treatment
- Undermining someone's work or reputation behind their back
- Withholding information that someone needs to do their job
- Setting someone up to fail by giving them impossible tasks or deadlines

**Cyberbullying:**

- Sending threatening, abusive, or humiliating messages via email, chat, or social media
- Sharing embarrassing photos or information about someone online
- Excluding someone from group chats or online discussions
- Making anonymous negative comments about a colleague

**Micromanagement as bullying:**

While managers have the right to oversee work, excessive micromanagement can cross the line into bullying. This includes constantly checking on someone's every action, removing responsibilities without explanation, or refusing to allow any autonomy. Context matters: occasional close supervision during a project is different from sustained, controlling behaviour that undermines someone's confidence and ability.

**What bullying is NOT:**

- Reasonable management actions (setting performance targets, giving honest feedback, addressing misconduct)
- A one-off disagreement or personality clash
- Constructive criticism delivered respectfully

**Key takeaway:** Bullying takes many forms, and it is not always obvious. If you are being subjected to repeated behaviour that makes you feel humiliated, threatened, or undermined, that is bullying, and you have the right to challenge it.`,
      },
      {
        title: 'Your Rights',
        sortOrder: 2,
        content: `If you are experiencing harassment or bullying at work, it is important to know that you have clear legal protections and that your employer has a duty to act.

**Legal protections:**

- **Equality Act 2010:** Protects you from harassment related to protected characteristics. Your employer is liable for harassment carried out by its employees unless it can show it took all reasonable steps to prevent it.
- **Health and Safety at Work Act 1974:** Your employer has a duty to protect your health, safety, and welfare at work. This includes protecting you from the psychological harm caused by bullying.
- **Protection from Harassment Act 1997:** Provides protection from behaviour that amounts to harassment, including stalking. This can apply in a workplace context.
- **Employment Rights Act 1996:** Protects you from unfair dismissal and detriment for raising legitimate workplace concerns, including complaints about harassment or bullying.

**Your employer's obligations:**

Your employer should have:

- A clear anti-harassment and bullying policy
- A grievance procedure for raising complaints
- Training for managers on how to handle complaints
- A commitment to investigating complaints promptly, fairly, and confidentially
- Support for individuals who report harassment or bullying (including protection from retaliation)

**Constructive dismissal:**

If your employer fails to address harassment or bullying, and you feel forced to resign as a result, you may have a claim for constructive dismissal. To succeed, you would need to show that your employer's failure amounted to a fundamental breach of your employment contract (such as breaching the implied duty of mutual trust and confidence).

**Time limits:**

If you want to bring a claim to an employment tribunal, you usually must do so within three months (minus one day) of the last act of harassment or discrimination. However, you must first contact ACAS for early conciliation, which pauses the clock temporarily.

**Record keeping:**

If you think you may need to raise a formal complaint or legal claim, keeping a written record is extremely important. Note dates, times, what happened, what was said, and any witnesses. Save relevant emails, messages, or documents.

**Key takeaway:** The law is on your side. You have the right to work in an environment free from harassment and bullying. If your employer fails to protect you, there are legal routes to hold them accountable.`,
      },
      {
        title: 'How to Report',
        sortOrder: 3,
        content: `Reporting harassment or bullying can feel daunting, but there are clear steps you can follow. The sooner you raise the issue, the sooner it can be addressed.

**Step 1: Talk to the person directly (if appropriate)**

In some cases, especially with lower-level behaviour, the person may not realise their behaviour is unwelcome. A calm, direct conversation can sometimes resolve things. For example: "When you make jokes about my accent, it makes me uncomfortable. I'd like you to stop."

However, this approach is only appropriate if you feel safe doing so. If the behaviour is serious, threatening, or involves a power imbalance, skip this step and go straight to a formal route.

**Step 2: Report to your line manager**

If speaking to the person directly is not possible or has not worked, raise the issue with your line manager. If your line manager is the person responsible for the behaviour, go to their manager or directly to HR.

Be specific about what has happened. Describe the behaviour, when and where it occurred, and how it has affected you. Bring any evidence you have (written records, emails, messages).

**Step 3: Raise a formal grievance**

If informal approaches do not resolve the issue, you have the right to raise a formal grievance through your organisation's grievance procedure. This triggers a formal investigation. Your employer should:

- Acknowledge your grievance in writing
- Investigate the complaint thoroughly and impartially
- Hold a grievance meeting where you can present your case
- Provide a written outcome with reasons for the decision
- Offer a right of appeal if you are not satisfied with the outcome

You are entitled to be accompanied by a colleague or trade union representative at grievance meetings.

**Step 4: Seek external support**

If your employer does not resolve the issue, or if you experience retaliation, you can:

- Contact ACAS (0300 123 1100) for free advice and early conciliation
- Seek legal advice from a solicitor who specialises in employment law
- Report the matter to an employment tribunal

**Confidentiality:**

Your employer should handle your complaint as confidentially as possible. However, some information will need to be shared with the person accused and with those involved in the investigation. Your employer should explain this process to you.

**Key takeaway:** You should never feel you have to tolerate harassment or bullying. Report it through the appropriate channels, keep a written record, and seek support if you need it. Your employer has a legal duty to take your complaint seriously.`,
      },
      {
        title: 'Bystander Action',
        sortOrder: 4,
        content: `Being a bystander means witnessing behaviour that is inappropriate, harmful, or unkind, without being the direct target. What you do in that moment matters. Bystanders have significant power to change workplace culture.

**Why bystanders matter:**

Research shows that when bystanders intervene, incidents of harassment and bullying are resolved more quickly and effectively. Silence is often interpreted as agreement. When nobody says anything, the person behaving badly assumes their behaviour is acceptable, and the person being targeted feels alone.

**Barriers to action:**

It is normal to feel unsure about intervening. Common reasons people stay silent include:

- Uncertainty about whether the behaviour is "bad enough" to justify speaking up
- Fear of becoming a target themselves
- Not wanting to create an awkward situation
- Believing it is not their place to get involved
- Assuming someone else will deal with it

**Strategies for bystander intervention:**

There are several ways to act, and you can choose the approach that fits the situation and your comfort level.

1. **Direct intervention:** Speak up in the moment. "That's not okay" or "I don't think that's funny" can be enough to stop the behaviour. This works well when you have a good relationship with the people involved and the situation is not physically threatening.

2. **Distract and redirect:** Change the subject, interrupt the conversation, or create a diversion. "Hey, can I borrow you for a minute?" or "Has anyone seen the agenda for the meeting?" This defuses the situation without direct confrontation.

3. **Support the target afterwards:** If you could not or did not intervene in the moment, check in with the person afterwards. "I saw what happened. Are you okay? That was not acceptable." Validation from a witness is incredibly powerful.

4. **Report it:** You can report the behaviour to a manager or HR, even if you are not the target. Many organisations allow anonymous reporting. You do not need the target's permission to report what you witnessed.

5. **Challenge in private:** If you have a good relationship with the person responsible, speak to them privately afterwards. "I noticed what you said to Sarah in the meeting. I don't think that was fair." Sometimes people respond better to feedback in a one-on-one setting.

**Key takeaway:** If you see something, do something. You do not need to be confrontational or heroic. Even a small action, like checking on a colleague afterwards or quietly reporting the behaviour, contributes to a workplace where harassment and bullying are not tolerated.`,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Course 7: New Starter Essentials
  // -----------------------------------------------------------------------
  {
    title: 'New Starter Essentials',
    description:
      'Everything you need to know in your first few weeks: key policies, how to book leave, who to contact, and how to make the most of your new role.',
    category: 'onboarding',
    duration: 8,
    modules: [
      {
        title: 'Your First Week',
        sortOrder: 0,
        content: `Starting a new job is exciting but can also feel overwhelming. Your first week is about settling in, getting to know people, and building the foundation for your time here. Do not put pressure on yourself to know everything straight away.

**What to expect:**

- **Day one:** You will likely receive your equipment, access to systems, and an introduction to your team. You may have meetings with your manager, HR, and key colleagues. There will be paperwork to complete (contracts, emergency contacts, bank details for payroll).
- **Induction sessions:** During your first week, you will probably attend induction sessions covering the organisation's history, values, structure, and key policies. Take notes and ask questions freely. Everyone expects new starters to have questions.
- **IT setup:** You will receive login credentials for email, internal systems, and any tools you need. If anything is missing or not working, let your manager or IT know straight away.

**Making a good first impression:**

- Be punctual. Arriving on time (or a few minutes early) shows professionalism and respect.
- Introduce yourself. You will not remember everyone's name on day one, and that is perfectly normal. People appreciate the effort of a friendly introduction.
- Listen and observe. Every workplace has its own culture and unwritten norms. Pay attention to how people communicate, when they take breaks, and how meetings are run.
- Take notes. You will be given a lot of information in a short period. Writing things down helps you remember and shows that you are engaged.

**Common first-week concerns:**

- **Feeling lost is normal.** Everyone has been the new person at some point. It takes time to learn your way around, understand processes, and feel confident.
- **It is okay to ask questions.** There is no such thing as a silly question in your first week. People would much rather you ask than make assumptions.
- **You do not need to impress everyone immediately.** Focus on learning and building relationships. Results will follow.

**Key takeaway:** Your first week is about orientation, not perfection. Be open, be curious, and give yourself time to settle in. The effort you put into learning now will pay off in the weeks and months ahead.`,
      },
      {
        title: 'Key Policies to Know',
        sortOrder: 1,
        content: `Every organisation has policies that set out expectations for how employees should behave and what support is available. You do not need to memorise every policy, but you should know the key ones and where to find them.

**Core policies you should be aware of:**

1. **Code of conduct:** This outlines the standards of behaviour expected of everyone in the organisation. It typically covers professional behaviour, conflicts of interest, use of company resources, and consequences for breaches.

2. **Equal opportunities and anti-discrimination policy:** Your organisation's commitment to treating everyone fairly regardless of protected characteristics. This should include how to report discrimination and what happens when a complaint is made.

3. **Health and safety policy:** Your responsibilities for maintaining a safe working environment and how to report hazards or accidents.

4. **Data protection and IT acceptable use policy:** How the organisation handles personal data (yours and others'), what you can and cannot do with company IT equipment, and rules around email, internet use, and social media.

5. **Absence and sickness policy:** How to report sickness absence, when a doctor's note is required, and what happens during extended absence (including sick pay entitlement).

6. **Disciplinary and grievance procedures:** What happens if there is a conduct issue, and how to raise a formal complaint if you have a workplace problem that cannot be resolved informally.

7. **Flexible working policy:** Whether and how you can request changes to your working pattern, location, or hours.

8. **Expenses policy:** What business expenses you can claim, the approval process, and how to submit claims.

**Where to find policies:**

Most organisations store their policies in a central location such as an HR system, company intranet, or shared drive. Ask your manager or HR team if you are not sure where to look. You should have access to all relevant policies from your first day.

**Key takeaway:** You do not need to read every policy cover to cover right now. But familiarise yourself with the key ones listed above, know where they are stored, and refer back to them when you need guidance. If something is unclear, ask.`,
      },
      {
        title: 'Booking Leave and Reporting Sickness',
        sortOrder: 2,
        content: `Understanding how to book time off and report sickness is one of the most practical things to learn in your first weeks. Getting it right from the start avoids confusion and ensures your leave balance stays accurate.

**Booking annual leave:**

- Your annual leave entitlement should be stated in your employment contract. In the UK, full-time employees are entitled to a minimum of 28 days per year (which can include bank holidays).
- To request leave, use your organisation's HR system or leave management tool. Submit your request with the dates you would like off, and your manager will approve or discuss alternatives.
- Give as much notice as possible, especially for longer periods. A good rule of thumb is to give at least twice as much notice as the number of days you want to take (e.g., two weeks' notice for one week off).
- Check for blackout dates or busy periods when leave may be restricted. Your manager or HR team can advise.
- If you are in your probation period, check whether there are any restrictions on taking leave during this time.

**Bank holidays:**

Find out whether bank holidays are included in your annual leave allowance or provided in addition to it. This varies by employer and should be stated in your contract.

**Reporting sickness:**

If you are unwell and cannot work, you must notify your employer as early as possible on the first day of absence. The typical process is:

1. Contact your line manager (or the designated person) by phone, text, or email before your normal start time or as soon as possible.
2. Explain briefly that you are unwell. You do not need to provide detailed medical information, but you should give an indication of how long you expect to be off.
3. Stay in touch. If your absence extends beyond the initial day, update your manager regularly.
4. For absences of seven calendar days or fewer, you can self-certify. For absences longer than seven days, you will need a fit note from your GP.
5. When you return, your manager may arrange a return-to-work meeting to check how you are feeling and discuss any support needed.

**Sick pay:**

Most employees are entitled to Statutory Sick Pay (SSP) from day four of absence. Your organisation may offer a more generous company sick pay scheme. Check your contract or ask HR.

**Key takeaway:** Book leave through the proper channels with reasonable notice, and report sickness promptly on the first day. These are straightforward processes, but following them correctly from the start shows professionalism and keeps everything running smoothly.`,
      },
      {
        title: 'Who to Contact',
        sortOrder: 3,
        content: `Knowing who to go to for different questions and issues saves you time and ensures you get the right help quickly. Here is a general guide to the key contacts in most organisations.

**Your line manager:**

Your first point of contact for most things. Go to your manager for:

- Day-to-day work questions and priorities
- Leave requests and scheduling
- Performance feedback and development
- Workplace concerns or conflicts
- Reporting hazards or safety issues

Build a good relationship with your manager early. Regular one-to-one meetings (even informal ones) help you stay aligned and give you a space to ask questions.

**HR (Human Resources):**

Go to HR for:

- Contract and employment terms questions
- Payroll and benefits queries
- Formal complaints (grievances) or discrimination concerns
- Family leave (maternity, paternity, adoption, shared parental leave)
- Reasonable adjustments for disability or health conditions
- Confidential concerns that you cannot raise with your manager

**IT/Tech support:**

Go to IT for:

- Equipment issues (laptop, phone, software problems)
- Password resets and access requests
- Reporting security incidents or suspicious emails
- Software installation requests

**Finance/Payroll:**

Go to finance or payroll for:

- Questions about your pay slip or tax code
- Expense claim queries
- Pension contributions
- Company credit card requests (if applicable)

**Health and safety representative:**

Go to your health and safety representative (or the person responsible for H&S) for:

- Reporting workplace hazards
- Requesting a workstation assessment
- Questions about safety procedures or equipment

**Mental health support:**

If you are struggling, you can speak to your manager, HR, a Mental Health First Aider (if your organisation has them), or your Employee Assistance Programme (EAP). You can also self-refer to your GP.

**Key takeaway:** Do not spend time worrying about who to ask. When in doubt, start with your line manager. They can point you in the right direction if they are not the right person. Nobody expects a new starter to know the answer to everything.`,
      },
      {
        title: 'Making the Most of Your Role',
        sortOrder: 4,
        content: `The first few months in a new role set the tone for your entire experience with the organisation. Here are practical strategies to help you learn quickly, build relationships, and position yourself for success.

**Set clear expectations:**

Early in your role, have an honest conversation with your manager about what success looks like. Ask questions such as:

- What are the top priorities for my first 30, 60, and 90 days?
- How will my performance be measured?
- What does a great job look like in this role?
- Are there any quick wins I can focus on to build momentum?
- What should I definitely avoid doing?

Having clarity on expectations removes ambiguity and helps you focus your energy where it matters most.

**Learn the business:**

Understanding how your organisation works, beyond just your own role, makes you more effective and more valuable. Learn about:

- How your team fits into the wider organisation
- Who the key stakeholders and decision-makers are
- How revenue is generated and where costs are managed
- The organisation's strategic priorities and current challenges

**Build relationships:**

- Introduce yourself to people outside your immediate team. Cross-functional relationships are valuable for collaboration and career growth.
- Ask people about their roles and what they are working on. People appreciate genuine interest.
- If your organisation has mentoring, buddy schemes, or employee networks, consider joining them.
- Attend social events and team activities when you can. These are often where the strongest relationships are built.

**Ask for feedback early and often:**

Do not wait for your formal review to find out how you are doing. Ask your manager for feedback regularly, especially in the first few months. "Is there anything I should be doing differently?" or "How do you think that meeting went?" shows initiative and openness to growth.

**Take ownership of your development:**

- Set personal learning goals for your first quarter.
- Identify skills you want to develop and discuss training opportunities with your manager.
- Keep a record of your achievements, projects, and positive feedback. This will be valuable during performance reviews.
- Be proactive about asking for new challenges or responsibilities as you settle in.

**Key takeaway:** The most successful new starters are those who combine curiosity with initiative. Ask questions, build relationships, seek feedback, and take ownership of your learning. Your first few months are an investment that shapes the rest of your time in the organisation.`,
      },
    ],
  },
]
