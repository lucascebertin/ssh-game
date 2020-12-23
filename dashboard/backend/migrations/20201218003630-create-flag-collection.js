module.exports = {
  async up(db, client) {
    await db.collection('flags')
      .insertMany([
        { title: 'L3CTF{0k_c4n_w3_st4rt?}', points: 10 },
        { title: 'L3CTF{y0u_sh311_n0t_p4ss}', points: 50 },
        { title: 'L3CTF{y34h_y34h_g0t_th3_k3ys_n0t_th3_ch33s3_th3_k3ys}', points: 100 },
        { title: 'L3CTF{4r3_y0u_t3ll1ng_m3_y0u_h4ck3d_4_t1m3_m4ch1n3}', points: 150 },
      ], { orderer: true })
  },

  async down(db, client) {
    await db.collection('albums').deleteMany()
  }
};
