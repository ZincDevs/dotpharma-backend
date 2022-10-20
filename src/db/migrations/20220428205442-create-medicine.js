/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicines', {
      m_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      m_name: {
        type: Sequelize.STRING
      },
      m_properties: {
        type: Sequelize.STRING
      },
      m_desciption: {
        type: Sequelize.TEXT
      },
      m_image: {
        type: Sequelize.TEXT
      },
      m_price: {
        type: Sequelize.STRING
      },
      m_status: {
        type: Sequelize.STRING
      },
      m_type: {
        type: Sequelize.STRING
      },
      m_tags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      m_short_descripption: { type: Sequelize.STRING },
      m_discount: { type: Sequelize.STRING },
      u_id: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'u_id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Medicines');
  }
};
