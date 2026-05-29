const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: 6,
    },

    avatar: {
      type: String,
      default: '',
    },

    bio: {
      type: String,
      maxlength: 500,
      default: '',
    },

    phone: {
      type: String,
      default: '',
    },

    country: {
      type: String,
      default: '',
    },

    website: {
      type: String,
      default: '',
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },

    /* ================= ROLE & AUTH ================= */

    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },

    googleId: {
      type: String,
      default: null,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      default: null,
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
      default: null,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    blockedReason: {
      type: String,
      default: '',
    },

    /* ================= PRIVACY ================= */

    profileVisibility: {
      type: String,
      enum: ['public', 'course-only', 'private'],
      default: 'course-only',
    },

    courseMates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    /* ================= COURSE SYSTEM ================= */

    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],

    teachingCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],

    completedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],

    certificates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate',
      },
    ],

    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
      },
    ],

    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
      },
    ],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],

    /* ================= PAYMENTS ================= */

    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
      },
    ],

    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],

    subscriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
      },
    ],

    /* ================= NOTIFICATIONS ================= */

    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
      },
    ],

    notificationPreferences: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
    },

    /* ================= SOCIAL LINKS ================= */

    socialLinks: {
      github: {
        type: String,
        default: '',
      },
      linkedin: {
        type: String,
        default: '',
      },
      twitter: {
        type: String,
        default: '',
      },
      portfolio: {
        type: String,
        default: '',
      },
    },

    /* ================= SECURITY ================= */

    failedLoginIPs: [
      {
        type: String,
      },
    ],

    devices: [
      {
        device: String,
        browser: String,
        ip: String,
        lastUsed: Date,
      },
    ],

    /* ================= ACADEMY STATS ================= */

    totalCoursesPurchased: {
      type: Number,
      default: 0,
    },

    totalCoursesCompleted: {
      type: Number,
      default: 0,
    },

    totalCertificates: {
      type: Number,
      default: 0,
    },

    totalSpent: {
      type: Number,
      default: 0,
    },

    learningStreak: {
      type: Number,
      default: 0,
    },

    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);