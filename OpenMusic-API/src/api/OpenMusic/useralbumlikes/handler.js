class UserAlbumLikesHandler {
  constructor(service) {
    this._service = service;

    this.postUserAlbumLikesHandler = this.postUserAlbumLikesHandler.bind(this);
    this.getUserAlbumLikesHandler = this.getUserAlbumLikesHandler.bind(this);
  }

  async postUserAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.checkAlbumById(albumId);
    const likeStatus = await this._service.checkUserAlbumLikesStatus(
      credentialId, albumId,
    );

    if (!likeStatus) {
      await this._service.addUserAlbumLikes(credentialId, albumId);

      return h.response({
        status: 'success',
        message: `Berhasil menyukai album ${albumId}`,
      }).code(201);
    }
    await this._service.deleteUserAlbumLikes(credentialId, albumId);

    return h.response({
      status: 'success',
      message: `Berhasil melakukan dislike album ${albumId}`,
    }).code(201);
  }

  async getUserAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;

    const likeService = await this._service.getUserAlbumLikes(albumId);
    const likeTotal = likeService.total;

    const response = h.response({
      status: 'success',
      data: {
        likes: likeTotal,
      },
    });
    response.header('X-Data-Source', likeService.source);
    return response;
  }
}

module.exports = UserAlbumLikesHandler;
