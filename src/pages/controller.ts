import { JsonController, Get, Put, Post, Param, Body, NotFoundError, HttpCode, Authorized } from 'routing-controllers'
// import pagesById, { Page } from './data'
import Page from './entity'
// type PageList = { pages: Page[] }

@JsonController()
export default class PageController {

    @Get('/pages/:id')
    getPage(
      @Param('id') id: number
    ) {
      return Page.findOne(id)
    }

    @Get('/pages')
    async allPages() {
      const pages = await Page.find()
      return { pages }
    }

    @Authorized()
    @Put('/pages/:id')
    async updatePage(
      @Param('id') id: number,
      @Body() update: Partial<Page>
    ) {
      const page = await Page.findOne(id)
        if (!page) throw new NotFoundError('Cannot find page')
        return Page.merge(page, update).save()
    }

    @Authorized()
    @Post('/pages')
    @HttpCode(201)
    createPage(
      @Body() page: Page
    ) {
      return page.save()
    }

}

// @JsonController()
// export default class PageController {

//     @Get('/pages/:id')
//     getPage(
//         @Param('id') id: number
//     ): Page {
//         return pagesById[id]
//     }

//     @Get('/pages')
//     allPages(): PageList {
//         return pageList
//     }

//     @Put('/pages/:id')
//     updatePage(
//         @Param('id') id: number,
//         @Body() body: Partial<Page>
//     ): Page {
//         return Object.assign(body,pagesById[id])
//     }

//     @Post('/pages')
//     @HttpCode(201)
//     createPage(
//         @Body() body: Page
//     ): Page {
//         return body
//     }
// }
