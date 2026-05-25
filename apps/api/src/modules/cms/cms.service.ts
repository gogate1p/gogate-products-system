import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  listBanners() {
    return this.prisma.cmsBanner.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } });
  }

  listSliders() {
    return this.prisma.cmsSlider.findMany({ where: { active: true } });
  }

  listPages() {
    return this.prisma.cmsPage.findMany({ where: { published: true } });
  }

  getPage(slug: string) {
    return this.prisma.cmsPage.findUnique({ where: { slug } });
  }

  createBanner(data: { title: string; imageUrl: string; linkUrl?: string; sortOrder?: number }) {
    return this.prisma.cmsBanner.create({ data });
  }

  createSlider(data: { title: string; slides: unknown[] }) {
    return this.prisma.cmsSlider.create({ data: { title: data.title, slides: data.slides as never } });
  }

  upsertPage(slug: string, title: string, content: string, published = true) {
    return this.prisma.cmsPage.upsert({
      where: { slug },
      create: { slug, title, content, published },
      update: { title, content, published },
    });
  }
}
