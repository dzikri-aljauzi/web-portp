-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL DEFAULT '',
    "year" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'web',
    "role" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'completed',
    "duration" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "overview" TEXT NOT NULL DEFAULT '',
    "problem" TEXT NOT NULL DEFAULT '',
    "solution" TEXT NOT NULL DEFAULT '',
    "learnings" TEXT NOT NULL DEFAULT '',
    "points" TEXT[],
    "stack" TEXT[],
    "features" JSONB NOT NULL DEFAULT '[]',
    "metrics" JSONB NOT NULL DEFAULT '[]',
    "gallery" JSONB NOT NULL DEFAULT '[]',
    "coverImage" TEXT NOT NULL DEFAULT '',
    "preview" TEXT NOT NULL DEFAULT 'certify',
    "liveUrl" TEXT NOT NULL DEFAULT '',
    "repoUrl" TEXT NOT NULL DEFAULT '',
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "period" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL DEFAULT '',
    "highlightValue" TEXT NOT NULL DEFAULT '',
    "highlightLabel" TEXT NOT NULL DEFAULT '',
    "points" TEXT[],
    "tags" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
