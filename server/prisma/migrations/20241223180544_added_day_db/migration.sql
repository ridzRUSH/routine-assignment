-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "routine_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration_weeks" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("routine_id")
);

-- CreateTable
CREATE TABLE "RoutineMilestone" (
    "milestone_id" SERIAL NOT NULL,
    "routine_id" INTEGER NOT NULL,
    "week_number" INTEGER NOT NULL,
    "benefit" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoutineMilestone_pkey" PRIMARY KEY ("milestone_id")
);

-- CreateTable
CREATE TABLE "RoutineStep" (
    "step_id" SERIAL NOT NULL,
    "routine_id" INTEGER NOT NULL,
    "step_number" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "optional_tips" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoutineStep_pkey" PRIMARY KEY ("step_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "RoutineStepProduct" (
    "step_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoutineStepProduct_pkey" PRIMARY KEY ("step_id","product_id")
);

-- CreateTable
CREATE TABLE "RoutineEngagement" (
    "engagement_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "routine_id" INTEGER NOT NULL,
    "week_number" INTEGER NOT NULL,
    "current_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoutineEngagement_pkey" PRIMARY KEY ("engagement_id")
);

-- CreateTable
CREATE TABLE "DailyEvent" (
    "event_id" SERIAL NOT NULL,
    "routine_id" INTEGER NOT NULL,
    "week_number" INTEGER NOT NULL,
    "day_number" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyEvent_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "DailyActivity" (
    "activity_id" SERIAL NOT NULL,
    "engagement_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyActivity_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "analytics_id" SERIAL NOT NULL,
    "routine_id" INTEGER NOT NULL,
    "total_completions" INTEGER NOT NULL,
    "avg_completion_rate" DOUBLE PRECISION NOT NULL,
    "popular_routine_rank" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("analytics_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RoutineEngagement_user_id_routine_id_key" ON "RoutineEngagement"("user_id", "routine_id");

-- CreateIndex
CREATE UNIQUE INDEX "DailyEvent_routine_id_week_number_day_number_key" ON "DailyEvent"("routine_id", "week_number", "day_number");

-- CreateIndex
CREATE UNIQUE INDEX "DailyActivity_engagement_id_event_id_key" ON "DailyActivity"("engagement_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_routine_id_key" ON "Analytics"("routine_id");

-- AddForeignKey
ALTER TABLE "RoutineMilestone" ADD CONSTRAINT "RoutineMilestone_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "Routine"("routine_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineStep" ADD CONSTRAINT "RoutineStep_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "Routine"("routine_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineStepProduct" ADD CONSTRAINT "RoutineStepProduct_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "RoutineStep"("step_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineStepProduct" ADD CONSTRAINT "RoutineStepProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineEngagement" ADD CONSTRAINT "RoutineEngagement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineEngagement" ADD CONSTRAINT "RoutineEngagement_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "Routine"("routine_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyEvent" ADD CONSTRAINT "DailyEvent_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "Routine"("routine_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyActivity" ADD CONSTRAINT "DailyActivity_engagement_id_fkey" FOREIGN KEY ("engagement_id") REFERENCES "RoutineEngagement"("engagement_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyActivity" ADD CONSTRAINT "DailyActivity_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "DailyEvent"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "Routine"("routine_id") ON DELETE RESTRICT ON UPDATE CASCADE;
