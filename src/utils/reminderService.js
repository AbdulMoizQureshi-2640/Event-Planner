const Event = require("../models/Event");
const User = require("../models/User");
const { sendEventReminder } = require("./emailService");

const checkAndSendReminders = async () => {
  try {
    const now = new Date();
    const events = await Event.find({
      "reminders.time": {
        $gte: new Date(now - 5 * 60 * 1000), // 5 minutes ago
        $lte: now,
      },
      "reminders.sent": false,
    }).populate("user");

    for (const event of events) {
      const dueReminders = event.reminders.filter(
        (reminder) => !reminder.sent && reminder.time <= now
      );

      for (const reminder of dueReminders) {
        const success = await sendEventReminder(
          event.user.email,
          event.name,
          event.date
        );

        if (success) {
          reminder.sent = true;
          await event.save();
        }
      }
    }
  } catch (error) {
    console.error("Error processing reminders:", error);
  }
};

// Run the reminder check every minute
const startReminderService = () => {
  setInterval(checkAndSendReminders, 60 * 1000);
  console.log("Reminder service started");
};

module.exports = {
  startReminderService,
};
