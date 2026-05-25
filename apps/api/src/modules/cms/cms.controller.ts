import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CmsService } from './cms.service';

@Controller('cms')
export class CmsController {
  constructor(private cms: CmsService) {}

  @Get('banners')
  banners() {
    return this.cms.listBanners();
  }

  @Get('sliders')
  sliders() {
    return this.cms.listSliders();
  }

  @Get('pages')
  pages() {
    return this.cms.listPages();
  }

  @Get('pages/:slug')
  page(@Param('slug') slug: string) {
    return this.cms.getPage(slug);
  }

  @Post('banners')
  createBanner(@Body() body: Record<string, unknown>) {
    return this.cms.createBanner(body as never);
  }

  @Post('sliders')
  createSlider(@Body() body: { title: string; slides: unknown[] }) {
    return this.cms.createSlider(body);
  }

  @Post('pages')
  upsertPage(@Body() body: { slug: string; title: string; content: string; published?: boolean }) {
    return this.cms.upsertPage(body.slug, body.title, body.content, body.published);
  }
}
