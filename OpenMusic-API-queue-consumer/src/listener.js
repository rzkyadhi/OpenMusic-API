class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = await this._playlistsService.getPlaylists(userId);
      const songs = await this._playlistsService.getPlaylistSongs(playlistId);
      console.log(playlists);
      console.log(songs);
      const playlistsongs = {
        playlist: {
          id: playlists[0].id,
          name: playlists[0].name,
          songs,
        },
      };
      console.log(playlistsongs);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistsongs));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
